import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

const Pyodide = ({ pythonCode }: any) => {
  const indexURL = 'https://cdn.jsdelivr.net/pyodide/dev/full/';
  const pyodide = useRef(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);
  const [pyodideOutput, setPyodideOutput] = useState('Evaluating...');
  useEffect(() => {
    (async function () {
      pyodide.current = await (globalThis as any).loadPyodide({ indexURL });
      setIsPyodideLoading(false);
    })();
  }, [pyodide]);

  // evaluate python code with pyodide and set output
  useEffect(() => {
    if (!isPyodideLoading) {
      const evaluatePython = async (pyodide: any, pythonCode: any) => {
        try {
          const output = await pyodide.runPythonAsync(pythonCode);
          return output;
        } catch (error) {
          // eslint-disable-next-line
          console.error(error);
          return 'Error evaluating Python code. See console for details.';
        }
      };
      (async function () {
        const output = await evaluatePython(pyodide.current, pythonCode);
        setPyodideOutput(output);
      })();
    }
  }, [isPyodideLoading, pyodide, pythonCode]);

  return (
    <>
      <Head>
        <script src={`${indexURL}pyodide.js`} />
      </Head>
      <div className="text-xl">
        {isPyodideLoading ? 'Loading...' : pyodideOutput}
      </div>
    </>
  );
};

export default Pyodide;
