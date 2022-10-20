import Editor from '@monaco-editor/react';

interface Props {
  type: string;
  name: string;
  content: string;
  onContentUpdate: (fileName: string, content: string) => void;
}

export default function MonacoEditor(props: Props) {
  return (
    <>
      <Editor
        theme="onedark"
        height="75%"
        width="100%"
        path={props.name}
        language={props.type}
        // defaultValue={props.content}
        value={props.content}
        beforeMount={setEditorTheme}
        options={{
          minimap: {
            enabled: false
          },
          fontSize: '20px'
        }}
        onChange={value => {
          props.onContentUpdate(props.name, value!);
        }}
      />
    </>
  );

  //Setting Up Theme for Editor
  function setEditorTheme(monaco: any) {
    monaco.editor.defineTheme('onedark', {
      base: 'vs-dark',
      inherit: true,
      //Defining Theme for the Editor (Using Dracula's Official Theme)
      rules: [
        {
          token: 'comment',
          foreground: '#5d7988',
          fontStyle: 'italic'
        },
        { token: 'constant', foreground: 'e06c75' },
        { token: 'keyword', foreground: '#c678dd' },
        { token: 'support', foreground: '#56b6c2' },
        { token: 'punctuation', foreground: 'abb2bf' },
        { token: 'string', foreground: '#98c379' },
        { token: 'variable', foreground: '#e5c07b' },
        { token: 'number', foreground: '#e5c07b' },
        { token: 'tag', foreground: '#e06c75' },
        { token: 'attribute.name', foreground: '#e06c75' },
        { token: 'attribute.value', foreground: '#98c379' },
        { token: 'identifier', foreground: '#61afef' }
      ],
      colors: {
        'editor.background': '#282c34',
        'editor.foreground': '#abb2bf',
        'editorLineNumber.foreground': '#5d7988',
        'editor.selectionBackground': '#363a46'
      }
    });
  }
}
