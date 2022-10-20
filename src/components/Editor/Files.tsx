import { useDeleteFile } from '@hooks/useFiles';
import { useSession } from 'next-auth/react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import FileIcon from './FileIcon';

interface Props {
  name: string;
  type: string;
  selected: string;
  onUpdateFile: (fileName: string) => void | undefined;
}

export default function Files(props: Props): JSX.Element {
  const { data: session } = useSession();

  const { mutate } = useDeleteFile({
    doc: props.name,
    user: session && session.user?.name
  });

  const handleDelete = () => {
    mutate();
  };

  return (
    <div
      className={`flex items-center justify-between px-3 py-1 m-auto text-sm text-gray-200 cursor-pointer 
        ${props.selected === 'true' ? ' bg-gray-700' : ''}
      `}
      onClick={() => {
        props.onUpdateFile(props.name);
      }}
      onKeyDown={() => {
        props.onUpdateFile(props.name);
      }}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center">
        <FileIcon type={props.type} />
        <p>{props.name}</p>
      </div>
      <RiDeleteBin6Line size={20} onClick={handleDelete} className="z-10" />
    </div>
  );
}
