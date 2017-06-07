const enableEmmet = (editor, emmet, options) => {
  if (!emmet) {
    throw new Error('Must include emmet.');
  }
  if (!editor) {
    throw new Error('Must provide monaco-editor instance.');
  }

};

export {
  enableEmmet
};
