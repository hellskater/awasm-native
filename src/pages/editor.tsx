import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Explorer from '@components/Editor/Explorer';
import TopBar from '@components/Editor/TopBar';
import MonacoEditor from '@components/Editor/MonacoEditor';
import OutputWindow from '@components/Editor/OutputWindow';
// import fileServices from './services/fileServices';
import Data from '../interfaces/data';
import { useGetFiles } from '@hooks/useFiles';

const Editor: NextPage = () => {
  const { data: session } = useSession({
    required: true
  });
  const {
    data: fetchedData,
    isFetched,
    refetch
  } = useGetFiles((session && session!.user?.name) as string);

  const [data, setData] = useState<Data>({
    'main.py': {
      type: 'python',
      content: `def greet():
    return "You are AWASM!"

greet()`
    }
  });
  const [refresh, setRefresh] = useState<number>(0);

  // Get data from server
  useEffect(() => {
    if (session) {
      refetch();
    }
  }, [session]);

  useEffect(() => {
    if (isFetched || fetchedData) {
      if (fetchedData) {
        setData(fetchedData);
        setTimeout(() => {
          setRefresh(refresh => refresh + 1);
        }, 1500);
      }
    }
  }, [isFetched, fetchedData]);

  const [selectedFile, setSelectedFile] = useState<string>('main.py');

  //Update Selected File
  const callUpdateFile = (fileName: string) => {
    setSelectedFile(fileName);
  };

  //Update file's content
  const callUpdateData = (fileName: string, content: string) => {
    const tempData = data;
    tempData[fileName].content = content;
    setData({ ...tempData });
  };

  //Add a new file
  const callAddNewFile = (fileName: string, type: string) => {
    const tempData = data;
    tempData[fileName] = {
      type: type,
      content: ''
    };
  };

  return (
    <div className="flex pt-16">
      <Head>
        <title>Editor</title>
        <link rel="icon" href="/thunder-hero.png" />
      </Head>
      <div className="h-screen w-1/6 bg-darkest">
        <Explorer
          projectFiles={data}
          projectName="EXPLORER"
          selectedFile={selectedFile}
          onUpdateFile={callUpdateFile}
          onAddNewFile={callAddNewFile}
        />
      </div>
      <div className="bg-dark w-1/2">
        <TopBar
          data={data}
          callSetData={setData}
          callRefresh={setRefresh}
          refresh={refresh}
        />
        <MonacoEditor
          type={data[selectedFile]?.type}
          name={selectedFile}
          content={data[selectedFile]?.content}
          onContentUpdate={callUpdateData}
        />
      </div>
      <div className="w-1/3">
        <OutputWindow code={data[selectedFile]?.content} />
      </div>
    </div>
  );
};

export default Editor;
