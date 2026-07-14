import subprocess

from atlas.citymap import build_citymap


def test_citymap_includes_files_and_nested_directories(tmp_path):
    (tmp_path / "src" / "atlas").mkdir(parents=True)
    (tmp_path / "docs").mkdir()
    (tmp_path / "src" / "atlas" / "main.py").write_text("print('hello')\n" * 8, encoding="utf-8")
    (tmp_path / "docs" / "guide.md").write_text("guide\n", encoding="utf-8")
    (tmp_path / "README.md").write_text("readme\n", encoding="utf-8")

    citymap = build_citymap(tmp_path)

    assert {file["path"] for file in citymap["files"]} == {
        "README.md",
        "docs/guide.md",
        "src/atlas/main.py",
    }
    assert {directory["path"] for directory in citymap["dirs"]} == {"docs", "src", "src/atlas"}
    assert citymap["version"] == 2
    assert citymap["layout"]["algorithm"] == "squarified-treemap-v2"
    assert all(file["rect"]["w"] > 0 and file["rect"]["d"] > 0 for file in citymap["files"])
    assert all(file["facts"]["kind"] == "non-code" for file in citymap["files"])


def test_citymap_is_deterministic_and_weights_content(tmp_path):
    (tmp_path / "small.txt").write_text("x\n", encoding="utf-8")
    (tmp_path / "large.txt").write_text("x\n" * 100, encoding="utf-8")

    first = build_citymap(tmp_path)
    second = build_citymap(tmp_path)
    files = {file["path"]: file for file in first["files"]}

    assert first == second
    assert files["large.txt"]["rect"]["w"] * files["large.txt"]["rect"]["d"] > files["small.txt"]["rect"]["w"] * files["small.txt"]["rect"]["d"]


def test_citymap_handles_a_repository_subdirectory(tmp_path):
    repository = tmp_path / "repository"
    target = repository / "src"
    target.mkdir(parents=True)
    (target / "main.py").write_text("print('hello')\n", encoding="utf-8")
    subprocess.run(["git", "init", str(repository)], check=True, capture_output=True)

    citymap = build_citymap(target)

    assert [file["path"] for file in citymap["files"]] == ["main.py"]


def test_citymap_does_not_reintroduce_ignored_files_when_git_result_is_empty(tmp_path):
    subprocess.run(["git", "init"], cwd=tmp_path, check=True, capture_output=True)
    (tmp_path / ".gitignore").write_text("*\n", encoding="utf-8")
    (tmp_path / "ignored.txt").write_text("private\n", encoding="utf-8")

    citymap = build_citymap(tmp_path)

    assert citymap["files"] == []


def test_citymap_enriches_code_files_and_rolls_them_up(tmp_path):
    (tmp_path / "src").mkdir()
    (tmp_path / "docs").mkdir()
    (tmp_path / "src" / "analysis.py").write_text("pass\n" * 60, encoding="utf-8")
    (tmp_path / "src" / "helper.py").write_text("pass\n" * 20, encoding="utf-8")
    (tmp_path / "docs" / "guide.md").write_text("Guide\n", encoding="utf-8")

    files = [
        {
            "id": "src/analysis.py",
            "path": "src/analysis.py",
            "module": "sample.analysis",
            "loc": 60,
            "function_count": 1,
            "class_count": 1,
            "warning_count": 1,
            "is_test": False,
        },
        {
            "id": "src/helper.py",
            "path": "src/helper.py",
            "module": "sample.helper",
            "loc": 20,
            "function_count": 1,
            "class_count": 0,
            "warning_count": 0,
            "is_test": False,
        },
    ]
    symbols = [
        {
            "id": "sample.analysis.run",
            "file_id": "src/analysis.py",
            "kind": "function",
            "loc": 60,
            "warnings": ["large_loc", "unresolved_calls"],
        },
        {
            "id": "sample.helper.unused",
            "file_id": "src/helper.py",
            "kind": "function",
            "loc": 20,
            "warnings": [],
        },
    ]
    citymap = build_citymap(
        tmp_path,
        files=files,
        symbols=symbols,
        calls=[{"source": "sample.analysis.run", "kind": "unresolved"}],
        warnings=[
            {
                "file_id": "src/analysis.py",
                "type": "unresolved_calls",
                "severity": "warning",
            }
        ],
        model={
            "nodes": [
                {"id": "sample.analysis.run", "dead": False, "load_bearing": True},
                {"id": "sample.helper.unused", "dead": True, "load_bearing": False},
            ],
            "clones": [{"hash": "same-shape", "members": ["sample.analysis.run", "sample.helper.unused"]}],
            "layer_violations": [{"layers": ["analysis", "support"]}],
        },
        functionalities=[
            {
                "id": "functionality:review",
                "status": "accepted",
                "member_ids": ["sample.analysis.run"],
            },
            {
                "id": "functionality:draft",
                "status": "proposed",
                "member_ids": ["sample.helper.unused"],
            },
        ],
    )

    records = {file["path"]: file for file in citymap["files"]}
    analysis = records["src/analysis.py"]["facts"]
    helper = records["src/helper.py"]["facts"]
    source = {directory["path"]: directory for directory in citymap["dirs"]}["src"]

    assert analysis["code_loc"] == 60
    assert analysis["callable_ids"] == ["sample.analysis.run"]
    assert analysis["warning_types"] == ["unresolved_calls"]
    assert analysis["unresolved_calls"] == 1
    assert analysis["large_function_loc"] == 60
    assert analysis["functionality_ids"] == ["functionality:review"]
    assert analysis["risk"] == "elevated"
    assert helper["dead_function_count"] == 1
    assert helper["functionality_ids"] == []
    assert records["docs/guide.md"]["facts"] == {"kind": "non-code", "risk": "neutral"}
    assert source["facts"]["code_loc"] == 80
    assert source["facts"]["clone_group_ids"] == ["clone:same-shape"]
    assert source["facts"]["layer_violation_ids"] == ["layer:analysis|support"]
    assert citymap["summary"] == {
        "total_loc": 80,
        "code_file_count": 2,
        "flagged_file_count": 2,
        "unresolved_calls": 1,
        "load_bearing_functions": 1,
        "layer_violation_count": 1,
    }
    assert source["header_rect"]["d"] > 0
    assert source["content_rect"]["z"] == source["rect"]["z"] + source["header_rect"]["d"]
