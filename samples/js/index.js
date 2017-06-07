require.config({ paths: { 'vs': 'vendor/monaco-editor/dev/vs' } });
require(['vs/editor/editor.main'], function () {
  var editor1 = monaco.editor.create(document.getElementById('editor1'), {
    value: '',
    language: 'html'
  });
  window['emmet-monaco'].enableEmmet(editor1, window.emmet);
});


