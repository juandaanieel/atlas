import shutil
from pathlib import Path

import pytest

from atlas.analyzer.payload import analyze_path
from atlas.vault import write_vault


FIXTURES = Path(__file__).parent / "fixtures"


def test_architecture_links_functions_and_pipelines():
    payload = analyze_path(FIXTURES / "simple_package")
    architecture = payload["architecture"]
    functions = {function["id"]: function for function in architecture["functions"]}

    main = functions["simple_pkg.a.main"]
    assert [call["id"] for call in main["callees"]] == [
        "simple_pkg.a.helper",
        "simple_pkg.b.beta",
    ]
    assert main["state"] == "root"
    assert "atlas/state/root" in main["tags"]
    assert main["snapshot_id"] == payload["snapshot_id"]
    assert architecture["pipelines"][0]["root"] == "simple_pkg.a.main"
    assert "use_cases" not in architecture


def test_pipelines_list_every_reachable_function(tmp_path):
    package = tmp_path / "wide"
    package.mkdir()
    (package / "__init__.py").write_text("", encoding="utf-8")
    steps = "".join(f"\n\ndef step_{index:02d}():\n    return finish()\n" for index in range(30))
    calls = "".join(f"    step_{index:02d}()\n" for index in range(30))
    (package / "flow.py").write_text(
        f"def main():\n{calls}{steps}\n\ndef finish():\n    return 1\n",
        encoding="utf-8",
    )

    pipeline = analyze_path(tmp_path)["architecture"]["pipelines"][0]

    # Breadth-first from the root: its 30 callees, then what they reach.
    assert pipeline["function_ids"] == [
        "wide.flow.main",
        *(f"wide.flow.step_{index:02d}" for index in range(30)),
        "wide.flow.finish",
    ]
    assert pipeline["edge_count"] == 60
    assert pipeline["summary"] == "Atlas reaches 32 functions from wide.flow.main."


def test_exported_roots_lead_the_pipelines(tmp_path):
    package = tmp_path / "pkg"
    package.mkdir()
    (package / "__init__.py").write_text("from pkg.api import load\n\n__all__ = ['load']\n", encoding="utf-8")
    (package / "api.py").write_text("def load():\n    return _read()\n\n\ndef _read():\n    return 1\n", encoding="utf-8")
    (package / "cli.py").write_text(
        "def main():\n    return one() + two()\n\n\ndef one():\n    return 1\n\n\ndef two():\n    return 2\n",
        encoding="utf-8",
    )

    architecture = analyze_path(tmp_path)["architecture"]
    functions = {function["id"]: function for function in architecture["functions"]}

    # main would lead by name and reach; the exported load leads instead.
    assert [pipeline["root"] for pipeline in architecture["pipelines"]] == ["pkg.api.load", "pkg.cli.main"]
    assert functions["pkg.api.load"]["exported_from"] == ["pkg"]
    assert not functions["pkg.cli.main"]["exported"]


def test_vault_keeps_test_functions_without_claiming_they_are_on_the_map(tmp_path):
    target = tmp_path / "simple_package"
    shutil.copytree(FIXTURES / "simple_package", target)
    module = target / "simple_pkg" / "a.py"
    module.write_text(
        module.read_text(encoding="utf-8")
        + "\n\ndef test_diagnostic_path():\n    helper()\n",
        encoding="utf-8",
    )

    payload = analyze_path(target)
    test_function = next(
        item
        for item in payload["architecture"]["functions"]
        if item["id"] == "simple_pkg.a.test_diagnostic_path"
    )

    assert test_function["state"] == "test"
    assert not test_function["in_static_map"]
    vault = write_vault(target, payload)
    note = next((vault / "00-atlas" / "Functions").glob("*test-diagnostic-path*.md"))
    assert "outside Atlas's static map" in note.read_text(encoding="utf-8")


def test_snapshot_id_is_stable_when_analysis_facts_do_not_change():
    source = FIXTURES / "simple_package"

    assert analyze_path(source)["snapshot_id"] == analyze_path(source)["snapshot_id"]


def test_snapshot_id_ignores_documentation_changes(tmp_path):
    target = tmp_path / "simple_package"
    shutil.copytree(FIXTURES / "simple_package", target)

    before = analyze_path(target)["snapshot_id"]
    document = target / "docs" / "basic_workflow.md"
    document.write_text("# Different workflow\n\nCall `helper()` instead.\n", encoding="utf-8")

    assert analyze_path(target)["snapshot_id"] == before


def test_vault_writes_function_notes_and_preserves_human_directories(tmp_path):
    source = FIXTURES / "simple_package"
    payload = analyze_path(source)
    vault = write_vault(source, payload, out=tmp_path / "vault")

    manifest = (vault / "00-atlas" / "manifest.json").read_text(encoding="utf-8")
    assert "simple_pkg.a.main" in manifest
    template = (vault / "10-functionality" / "_template.md").read_text(encoding="utf-8")
    assert template.startswith("---\natlas_kind: functionality")

    function_notes = list((vault / "00-atlas" / "Functions").glob("*.md"))
    main_note = next(note for note in function_notes if "simple-pkg-a-main" in note.name)
    content = main_note.read_text(encoding="utf-8")
    assert "Run the simple pipeline." in content
    assert "simple_pkg.a.helper" in content
    assert "simple_pkg.b.beta" in content
    assert not (vault / "00-atlas" / "Use-cases").exists()

    accepted = vault / "10-functionality" / "accepted.md"
    accepted.write_text("# Kept by a human\n", encoding="utf-8")
    write_vault(source, payload, out=vault)
    assert accepted.read_text(encoding="utf-8") == "# Kept by a human\n"


def test_vault_rejects_a_symlinked_generated_directory(tmp_path):
    root = tmp_path / "package"
    root.mkdir()
    (root / "module.py").write_text("def run():\n    return 1\n", encoding="utf-8")
    payload = analyze_path(root)
    vault = tmp_path / "vault"
    vault.mkdir()
    external = tmp_path / "external"
    external.mkdir()
    sentinel = external / "keep.md"
    sentinel.write_text("keep me\n", encoding="utf-8")
    (vault / "00-atlas").symlink_to(external, target_is_directory=True)

    with pytest.raises(ValueError, match="symlinked output path"):
        write_vault(root, payload, out=vault)

    assert sentinel.read_text(encoding="utf-8") == "keep me\n"


def test_repeated_vault_build_keeps_the_same_snapshot(tmp_path):
    target = tmp_path / "simple_package"
    shutil.copytree(FIXTURES / "simple_package", target)

    before = analyze_path(target)["snapshot_id"]
    write_vault(target)
    after_first_build = analyze_path(target)["snapshot_id"]
    write_vault(target)
    after_second_build = analyze_path(target)["snapshot_id"]

    assert after_first_build == before
    assert after_second_build == before


def test_accepted_functionality_adds_function_membership_and_tags(tmp_path):
    target = tmp_path / "simple_package"
    shutil.copytree(FIXTURES / "simple_package", target)
    before = analyze_path(target)["snapshot_id"]
    functionality = target / ".atlas" / "vault" / "10-functionality" / "value-preparation.md"
    functionality.parent.mkdir(parents=True, exist_ok=True)
    functionality.write_text(
        """---
atlas_kind: functionality
atlas_id: functionality:value-preparation
status: accepted
tags:
  - domain/data-validation
members:
  - simple_pkg.a.main
  - simple_pkg.a.helper
---

# Value preparation

Prepares and validates values before the final calculation.
""",
        encoding="utf-8",
    )

    payload = analyze_path(target)
    functions = {item["id"]: item for item in payload["architecture"]["functions"]}

    assert payload["snapshot_id"] != before
    assert functions["simple_pkg.a.main"]["functionalities"] == ["functionality:value-preparation"]
    assert "domain/data-validation" in functions["simple_pkg.a.helper"]["tags"]

    vault = write_vault(target, payload)
    main_note = next((vault / "00-atlas" / "Functions").glob("simple-pkg-a-main*.md"))
    assert "functionality:value-preparation" in main_note.read_text(encoding="utf-8")


def test_analysis_reads_functionalities_from_an_explicit_vault_directory(tmp_path):
    vault = tmp_path / "architecture"
    functionality = vault / "10-functionality" / "finish-value.md"
    functionality.parent.mkdir(parents=True)
    functionality.write_text(
        """---
atlas_kind: functionality
status: accepted
members:
  - simple_pkg.b.beta
---

# Finish value

Completes the package calculation.
""",
        encoding="utf-8",
    )

    functions = {
        item["id"]: item
        for item in analyze_path(FIXTURES / "simple_package", vault_dir=vault)["architecture"]["functions"]
    }

    assert functions["simple_pkg.b.beta"]["functionalities"] == ["functionality:finish-value"]


def test_missing_functionality_members_are_reported(tmp_path):
    target = tmp_path / "simple_package"
    shutil.copytree(FIXTURES / "simple_package", target)
    functionality = target / ".atlas" / "vault" / "10-functionality" / "stale.md"
    functionality.parent.mkdir(parents=True, exist_ok=True)
    functionality.write_text(
        """---
atlas_kind: functionality
atlas_id: functionality:stale
status: accepted
members:
  - simple_pkg.missing.callable
---

# Stale definition
""",
        encoding="utf-8",
    )

    payload = analyze_path(target)

    assert payload["architecture"]["functionality_issues"] == [
        {
            "type": "missing_functionality_members",
            "functionality_id": "functionality:stale",
            "path": "stale.md",
            "member_ids": ["simple_pkg.missing.callable"],
            "message": "References missing callable IDs: simple_pkg.missing.callable",
        }
    ]
    assert any(
        warning["type"] == "missing_functionality_members"
        for warning in payload["warnings"]
    )


def test_duplicate_functionality_ids_are_rejected(tmp_path):
    vault = tmp_path / "vault"
    directory = vault / "10-functionality"
    directory.mkdir(parents=True)
    definition = """---
atlas_kind: functionality
atlas_id: functionality:duplicate
members:
---

# Duplicate
"""
    (directory / "first.md").write_text(definition, encoding="utf-8")
    (directory / "second.md").write_text(definition, encoding="utf-8")

    with pytest.raises(ValueError, match="Duplicate functionality ID"):
        analyze_path(FIXTURES / "simple_package", vault_dir=vault)


@pytest.mark.parametrize(
    ("metadata", "message"),
    [
        ("atlas_id:\nstatus: proposed", "nonempty scalar atlas_id"),
        ("atlas_id: functionality:invalid\nstatus:", "nonempty scalar status"),
        (
            "atlas_id: functionality:invalid\nstatus: archived",
            "unsupported status 'archived'",
        ),
    ],
)
def test_invalid_functionality_scalars_are_rejected(tmp_path, metadata, message):
    vault = tmp_path / "vault"
    directory = vault / "10-functionality"
    directory.mkdir(parents=True)
    (directory / "invalid.md").write_text(
        f"""---
atlas_kind: functionality
{metadata}
members:
---

# Invalid
""",
        encoding="utf-8",
    )

    with pytest.raises(ValueError, match=message):
        analyze_path(FIXTURES / "simple_package", vault_dir=vault)


def test_analysis_rejects_a_symlinked_functionality_directory(tmp_path):
    target = tmp_path / "simple_package"
    shutil.copytree(FIXTURES / "simple_package", target)
    vault = target / ".atlas" / "vault"
    vault.mkdir(parents=True)
    external = tmp_path / "external-functionalities"
    external.mkdir()
    (vault / "10-functionality").symlink_to(external, target_is_directory=True)

    with pytest.raises(ValueError, match="symlinked functionality path"):
        analyze_path(target)


def test_analysis_rejects_an_explicit_symlinked_vault(tmp_path):
    external = tmp_path / "external-vault"
    external.mkdir()
    vault = tmp_path / "vault"
    vault.symlink_to(external, target_is_directory=True)

    with pytest.raises(ValueError, match="symlinked vault directory"):
        analyze_path(FIXTURES / "simple_package", vault_dir=vault)


def test_analysis_skips_a_symlinked_functionality_note(tmp_path):
    target = tmp_path / "simple_package"
    shutil.copytree(FIXTURES / "simple_package", target)
    directory = target / ".atlas" / "vault" / "10-functionality"
    directory.mkdir(parents=True)
    external = tmp_path / "external-functionality.md"
    external.write_text(
        """---
atlas_kind: functionality
status: accepted
members:
  - simple_pkg.a.main
---

# External functionality
""",
        encoding="utf-8",
    )
    (directory / "external.md").symlink_to(external)

    architecture = analyze_path(target)["architecture"]

    assert architecture["functionalities"] == []
    main = next(item for item in architecture["functions"] if item["id"] == "simple_pkg.a.main")
    assert main["functionalities"] == []
