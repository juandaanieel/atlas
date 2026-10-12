import MarkdownIt from 'markdown-it';

// Docstrings are repository content: render formatting, never embedded HTML or images.
const markdown = new MarkdownIt({ html: false }).disable('image');

export function documentationHtml(docstring) {
  return docstring
    ? markdown.render(docstring)
    : '<p class="missing-doc">No docstring is available for this symbol. Its declared interface is shown above; open Code to inspect the implementation.</p>';
}
