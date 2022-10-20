import Pyodide from './Pyodide';

type Props = {
  code: string;
};

export default function OutputWindow({ code }: Props) {
  return (
    <div className="h-full w-full p-10">
      <p className="text-2xl mb-10">Output</p>
      <Pyodide pythonCode={code} />
    </div>
  );
}
