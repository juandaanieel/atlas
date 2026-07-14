import json
from pathlib import Path
import shutil
import subprocess

import pytest

from atlas.analyzer.payload import write_report
from atlas.cli import main
from atlas.diagrams import write_diagrams


FIXTURES = Path(__file__).parent / "fixtures"


def test_explore_writes_static_explorer(tmp_path):
    source = FIXTURES / "simple_package"
    target = tmp_path / "simple_package"
    shutil.copytree(source, target)

    main(["explore", "--where", str(target)])

    index = target / ".atlas" / "explorer" / "index.html"
    assert index.exists()
    assert "window.ATLAS_PAYLOAD" in index.read_text(encoding="utf-8")
    assert (target / ".atlas" / "vault" / "00-atlas" / "Home.md").exists()
    app = target / ".atlas" / "explorer" / "assets" / "src" / "app.js"
    app_text = app.read_text(encoding="utf-8")
    assert '"summary", "Summary"' in app_text
    assert '"use-cases", "Use cases"' in app_text
    assert '"functions", "Functions"' in app_text
    assert '"pipelines", "Pipelines"' not in app_text
    assert '"functionalities", "Functionalities"' not in app_text
    assert "useCaseArchitectureCard" in app_text
    assert "directCallees" in app_text
    assert "data-use-case-function" in app_text
    assert "useCaseLayerSelections" in app_text
    assert "collapsedUseCases" in app_text
    assert "data-collapse-use-case" in app_text
    assert "showFullGraph" in app_text
    assert "activateFunction" in app_text
    assert "functionSectionTree" in app_text
    assert "data-collapse-function-section" in app_text
    assert "collapsedFunctionSections" in app_text
    assert "functionClassView" in app_text
    assert "data-collapse-function-class" in app_text
    assert "collapsedFunctionClasses" in app_text
    assert "renderNavigation" in app_text
    assert "outside the static map" in app_text
    assert 'canvas.style.display = "none"' in app_text
    assert 'tabContent.style.display = "block"' in app_text
    assert "navigationSurface" in app_text
    assert "renderNavigationSurface" in app_text
    assert "renderCityMapRail" in app_text
    assert "renderTree" in app_text
    assert "synchronizeGraphWithCityPath" in app_text
    assert "data-city-directory" in app_text
    assert "data-city-open" not in app_text
    assert "selectCityItem" in app_text
    assert "detailSelection" in app_text
    assert "objectFocus" in app_text
    assert "objectMethodGraph" in app_text
    assert "Back to object relationships" in app_text
    assert "data-object-method" in app_text
    assert "stateLinksForObject" in app_text
    assert "sourceSelection" not in app_text
    assert "cityMapItems" in app_text
    assert "graphPromptSelection" in app_text
    assert "graphPromptTarget" in app_text
    assert "graphPromptPipelineOrder" in app_text
    assert "reviewPromptPanel" in app_text
    assert "reviewPromptItems" in app_text
    assert "data-copy-review-prompt" in app_text
    assert "data-clear-review-prompt" in app_text
    assert "data-remove-review-prompt-item" in app_text
    assert 'data-quick-prompt="make-function"' in app_text
    assert "data-add-comment" in app_text
    assert "generatedPrompt" not in app_text
    assert "data-generate-prompt" not in app_text
    assert "data-generated-prompt" not in app_text
    assert "data-add-to-review-prompt" not in app_text
    assert "Add to review prompt" not in app_text
    assert "data-edge-source" in app_text
    assert "statically resolved pipeline" in app_text
    styles = (target / ".atlas" / "explorer" / "assets" / "styles.css").read_text(encoding="utf-8")
    assert "[hidden] { display: none !important; }" in styles
    assert ".history-button" in styles
    assert ".architecture-card-toggle" in styles
    assert ".function-section-toggle" in styles
    assert ".function-class-toggle" in styles
    assert ".city-map-svg" in styles
    assert ".graph-prompt-composer" in styles
    assert ".graph-prompt-selected" in styles
    index_text = index.read_text(encoding="utf-8")
    assert 'id="fullGraph"' in index_text
    assert 'id="cityMapRail"' in index_text
    assert 'id="navigationModes"' in index_text
    assert 'id="cityContent"' not in index_text
    assert 'id="tree"' in index_text
    assert 'id="repositoryMap"' not in index_text
    assert 'id="detailSplitter"' not in index_text
    assert 'id="themeToggle"' in index_text
    assert 'id="graphPromptComposer"' in index_text
    snapshot = json.loads((target / ".atlas" / "atlas.json").read_text(encoding="utf-8"))
    assert snapshot["citymap"]["layout"]["algorithm"] == "squarified-treemap-v2"


def test_vault_writes_to_an_explicit_directory(tmp_path):
    source = FIXTURES / "simple_package"
    target = tmp_path / "simple_package"
    output = tmp_path / "architecture"
    shutil.copytree(source, target)

    main(["vault", "--where", str(target), "--out", str(output)])

    assert (output / "00-atlas" / "Home.md").exists()


def test_explore_reads_use_cases_from_the_workflow_directory(tmp_path):
    source = FIXTURES / "simple_package"
    target = tmp_path / "simple_package"
    shutil.copytree(source, target)
    workflow_dir = tmp_path / "workflows"
    (target / "examples").rename(workflow_dir)

    main(["explore", "--where", str(target), "--workflow", str(workflow_dir)])

    snapshot = json.loads((target / ".atlas" / "atlas.json").read_text(encoding="utf-8"))
    use_case = snapshot["architecture"]["use_cases"][0]
    assert use_case["path"] == "docs/basic_workflow.md"
    assert use_case["example_paths"] == ["workflows/basic_workflow.gds"]


def test_explore_adds_a_python_workflow_without_matching_documentation(tmp_path):
    source = FIXTURES / "simple_package"
    target = tmp_path / "simple_package"
    shutil.copytree(source, target)
    workflow = target / "examples" / "asq_spectrum.py"
    workflow.write_text(
        'def main():\n    """Calculate the ASQ spectrum."""\n',
        encoding="utf-8",
    )

    main(["explore", "--where", str(target), "--workflow", str(workflow)])

    snapshot = json.loads((target / ".atlas" / "atlas.json").read_text(encoding="utf-8"))
    use_case = next(
        item for item in snapshot["architecture"]["use_cases"] if item["path"] == "examples/asq_spectrum.py"
    )
    assert use_case["title"] == "Asq Spectrum"
    assert use_case["function_ids"] == ["examples.asq_spectrum.main"]


def test_explore_registers_output_dir_with_local_git_excludes(tmp_path):
    subprocess.run(["git", "init"], cwd=tmp_path, check=True, capture_output=True)
    source = FIXTURES / "simple_package"
    target = tmp_path / "simple_package"
    shutil.copytree(source, target)

    main(["explore", "--where", str(target)])
    main(["explore", "--where", str(target)])

    exclude_path = tmp_path / ".git" / "info" / "exclude"
    exclude_lines = exclude_path.read_text(encoding="utf-8").splitlines()
    assert exclude_lines.count("/simple_package/.atlas/") == 1


def test_explore_does_not_follow_a_symlinked_git_exclude(tmp_path):
    subprocess.run(["git", "init"], cwd=tmp_path, check=True, capture_output=True)
    target = tmp_path / "package"
    target.mkdir()
    (target / "module.py").write_text("def run():\n    return 1\n", encoding="utf-8")
    external = tmp_path / "external-exclude"
    external.write_text("keep me\n", encoding="utf-8")
    exclude_path = tmp_path / ".git" / "info" / "exclude"
    exclude_path.unlink()
    exclude_path.symlink_to(external)

    main(["explore", "--where", str(target)])

    assert external.read_text(encoding="utf-8") == "keep me\n"


def test_explore_requires_explicit_where():
    with pytest.raises(SystemExit):
        main(["explore"])


def test_explore_rejects_a_missing_directory_without_creating_it(tmp_path):
    missing = tmp_path / "missing"

    with pytest.raises(SystemExit):
        main(["explore", "--where", str(missing)])

    assert not missing.exists()


def test_explore_rejects_a_missing_workflow_path(tmp_path):
    with pytest.raises(SystemExit):
        main(
            [
                "explore",
                "--where",
                str(tmp_path),
                "--workflow",
                str(tmp_path / "missing.py"),
            ]
        )


def test_explore_rejects_a_non_python_workflow_file(tmp_path):
    workflow = tmp_path / "workflow.txt"
    workflow.write_text("example\n", encoding="utf-8")

    with pytest.raises(SystemExit):
        main(["explore", "--where", str(tmp_path), "--workflow", str(workflow)])


def test_explore_validates_the_resolved_workflow_file_type(tmp_path):
    target = tmp_path / "workflow.txt"
    target.write_text("example\n", encoding="utf-8")
    workflow = tmp_path / "workflow.py"
    workflow.symlink_to(target)

    with pytest.raises(SystemExit):
        main(["explore", "--where", str(tmp_path), "--workflow", str(workflow)])


def test_explorer_escapes_script_closing_text_in_the_payload(tmp_path):
    source = FIXTURES / "simple_package"
    target = tmp_path / "simple_package"
    shutil.copytree(source, target)
    module = target / "simple_pkg" / "a.py"
    module.write_text(
        module.read_text(encoding="utf-8")
        + '\n\ndef injected():\n    """</script><script>window.ATLAS_INJECTED = true</script>"""\n',
        encoding="utf-8",
    )

    main(["explore", "--where", str(target)])

    index = (target / ".atlas" / "explorer" / "index.html").read_text(encoding="utf-8")
    assert "</script><script>window.ATLAS_INJECTED" not in index
    assert "\\u003c/script\\u003e\\u003cscript\\u003e" in index


def test_report_writes_markdown(tmp_path):
    source = FIXTURES / "simple_package"
    target = tmp_path / "simple_package"
    shutil.copytree(source, target)

    write_report(target)

    report = target / ".atlas" / "report.md"
    assert report.exists()
    assert "# Atlas Report" in report.read_text(encoding="utf-8")


def test_render_writes_workflow_and_map_diagrams(tmp_path):
    source = FIXTURES / "simple_package"
    target = tmp_path / "simple_package"
    shutil.copytree(source, target)

    write_diagrams(target)

    diagrams = target / ".atlas" / "diagrams"
    expected = {"workflow.mmd", "map.mmd"}
    assert {path.name for path in diagrams.iterdir()} == expected
    assert "Atlas Workflow" in (diagrams / "workflow.mmd").read_text(encoding="utf-8")
    assert "Atlas Layer Map" in (diagrams / "map.mmd").read_text(encoding="utf-8")


def test_workflow_ghosts_dead_code(tmp_path):
    source = FIXTURES / "defect_package"
    target = tmp_path / "defect_package"
    shutil.copytree(source, target)

    write_diagrams(target)

    workflow = (target / ".atlas" / "diagrams" / "workflow.mmd").read_text(encoding="utf-8")
    # Dead code is drawn with the ghost class, not the live workflow.
    assert ":::ghost" in workflow
    assert "dead code" in workflow
