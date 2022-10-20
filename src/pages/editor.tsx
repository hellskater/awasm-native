import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useState, useEffect } from 'react';

import Explorer from '@components/Editor/Explorer';
import TopBar from '@components/Editor/TopBar';
import MonacoEditor from '@components/Editor/MonacoEditor';
import OutputWindow from '@components/Editor/OutputWindow';
import Data from '@interfaces/data';
import { useGetFiles } from '@hooks/useFiles';

const Editor: NextPage = () => {
  // To make sure the user is logged in to access this page
  const { data: session } = useSession({
    required: true
  });

  // React query hook to fetch all the files from data base if exists
  const {
    data: fetchedData,
    isFetched,
    refetch
  } = useGetFiles((session && session!.user?.name) as string);

  // Data will be initialized to a default value to show on the editor, this will be replaced by the api data once available
  const [data, setData] = useState<Data>({
    'main.py': {
      type: 'python',
      content: `def greet():
    return "You are AWASM!"

greet()`
    }
  });

  // Make the api call once the session data is available
  useEffect(() => {
    if (session) {
      refetch();
    }
  }, [session]);

  // If the data fetching is successful and there is data to display then replace the default data with fetched data
  useEffect(() => {
    if (isFetched || fetchedData) {
      if (fetchedData) {
        setData(fetchedData);
      }
    }
  }, [isFetched, fetchedData]);

  const [selectedFile, setSelectedFile] = useState<string>('main.py');

  // Update Selected File
  const callUpdateFile = (fileName: string) => {
    setSelectedFile(fileName);
  };

  // Update file's content
  const callUpdateData = (fileName: string, content: string) => {
    const tempData = data;
    tempData[fileName].content = content;
    setData({ ...tempData });
  };

  // Add a new file
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
        <TopBar data={data} />
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
