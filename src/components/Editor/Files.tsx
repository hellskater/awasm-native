import { useSession } from 'next-auth/react';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { useDeleteFile } from '@hooks/useFiles';
import FileIcon from '@components/Editor/FileIcon';

type Props = {
  name: string;
  type: string;
  selected: string;
  onUpdateFile: (fileName: string) => void | undefined;
  length: number;
};

const Files = ({ name, type, selected, onUpdateFile, length }: Props) => {
  const { data: session } = useSession(); // User data

  // React query hook to delete file
  const { mutate } = useDeleteFile({
    doc: name,
    user: (session && session.user?.name) as string
  });

  const handleDelete = () => {
    mutate();
  };

  return (
    <div
      className={`flex items-center justify-between px-3 py-1 m-auto text-sm text-gray-200 cursor-pointer 
        ${selected === 'true' ? ' bg-gray-700' : ''}
      `}
      onClick={() => {
        onUpdateFile(name);
      }}
      onKeyDown={() => {
        onUpdateFile(name);
      }}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center">
        <FileIcon type={type} />
        <p>{name}</p>
      </div>
      {length > 1 && (
        <RiDeleteBin6Line size={20} onClick={handleDelete} className="z-10" />
      )}
    </div>
  );
};

export default Files;
