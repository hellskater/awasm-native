import Pyodide from './Pyodide';

export default function OutputWindow(props: { code: string }) {
  return (
    <div className="h-full w-full p-10">
      <p className="text-2xl mb-10">Output</p>
      <Pyodide pythonCode={props.code} />
    </div>
  );
}
