import { useState } from 'react';

import { VscNewFile } from 'react-icons/vsc';

import Files from '@components/Editor/Files';
import { AddNew } from '@components/Editor/AddNew';
import Data from '@interfaces/data';

type Props = {
  projectName: string;
  selectedFile: string;
  projectFiles: Data;
  onUpdateFile: (fileName: string) => void | undefined;
  onAddNewFile: (fileName: string, type: string) => void;
  length: number;
};

const Explorer = ({
  projectFiles,
  projectName,
  selectedFile,
  onAddNewFile,
  onUpdateFile,
  length
}: Props) => {
  const [viewAddFile, setViewAddFile] = useState<any>(0);

  return (
    //Main Explorer Container
    <>
      {/* Top Tab That Shows Project name and Add File Button */}
      <div className="flex items-center justify-between h-8 px-3 text-gray-200 text-sm font-bold">
        <p>{projectName}</p>
        <VscNewFile
          className="text-lg cursor-pointer hover:text-green-600"
          onClick={() => {
            setViewAddFile(!viewAddFile);
          }}
        />
      </div>

      {/* Create a new file Form */}

      <div>
        {viewAddFile ? (
          <AddNew
            placeholder="New File..."
            onEnter={(name, type) => {
              setViewAddFile(0);
              onAddNewFile(name, type);
            }}
          />
        ) : (
          ''
        )}
      </div>

      {/* Container that contains Files List */}
      <div>
        {Object.entries(projectFiles).map(([key, file]) => (
          <Files
            key={key}
            name={key}
            type={file.type}
            selected={`${selectedFile === key ? true : false}`}
            onUpdateFile={onUpdateFile}
            length={length}
          />
        ))}
      </div>
    </>
  );
};

export default Explorer;
