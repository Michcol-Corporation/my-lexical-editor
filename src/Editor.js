import React, { useEffect } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
// Remove the unused import
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
//import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import './EditorStyles.css'; // Ścieżka do Twojego pliku CSS
// Definicja motywu edytora
const theme = {
  editorContent: {
    color: 'blue',
    fontSize: '18px',
  },
  editorPlaceholder: {
    color: 'gray',
    fontStyle: 'italic',
  },
  DisplayContent: {
    color: 'blue',
    fontSize: '18px',
    // Dodaj więcej stylów tutaj...
  }
};

// Funkcja wywoływana przy każdej zmianie w edytorze
function onChange(editorState) {
  editorState.read(() => {
    // Tutaj możesz odczytać zawartość edytora
  });
}

// Twój własny plugin do auto-fokusu
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Skup się na edytorze, gdy komponent zostanie zamontowany
    editor.focus();
  }, [editor]);

  return null;
}

// Obsługa błędów Lexical
function onError(error) {
  console.error('Lexical editor encountered an error:', error);
}

// Główny komponent edytora
function Editor() {
  // Konfiguracja początkowa dla LexsscalComposer
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
  };
  return (
  <LexicalComposer initialConfig={initialConfig}>
  <div className="editorContainer">
    <PlainTextPlugin
      contentEditable={
        <ContentEditable 
          className="editorContent"
          data-placeholder="Wpisz tekst..." // Dodaj atrybut data-placeholder
        />
      }
      placeholder={null} // Usuń placeholder jako oddzielny element
    />
    <OnChangePlugin onChange={onChange} />
    <HistoryPlugin />
    <MyCustomAutoFocusPlugin />
  </div>
  <LexicalErrorBoundary />
  {/* ... */}
</LexicalComposer>
);
}
export default Editor;