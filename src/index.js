const expandAbbreviation = (emmet, source, language) => {
  let target = emmet.expandAbbreviation(source, language, language);
  let result = emmet.tabStops.extract(target, { escape(ch) { return ch; } });
  return result.text;
};

const enableEmmet = (editor, emmet, options) => {
  if (!emmet) {
    throw new Error('Must include emmet.');
  }
  if (!editor) {
    throw new Error('Must provide monaco-editor instance.');
  }
  editor.addCommand(monaco.KeyCode.Tab, () => {
    let word = editor.model.getValueInRange(editor.getSelection());
    let pos = editor.getPosition();
    if (!word) {
      let lineContent = editor.model.getLineContent(pos.lineNumber);
      word = emmet.utils.action.extractAbbreviation(lineContent.substring(0, pos.column));
    }
    // Get expand text
    let expandText = expandAbbreviation(emmet, word, 'html');
    if (expandText) {
      // replace range content: pos.column , pos.column -word.length;
      let range = new monaco.Range(pos.lineNumber, pos.column - word.length, pos.lineNumber, pos.column);
      let id = { major: 1, minor: 1 };
      var op = { identifier: id, range, text: expandText, forceMoveMarkers: true };
      editor.executeEdits('', [op]);
    }
  });
};

export {
  enableEmmet
};
