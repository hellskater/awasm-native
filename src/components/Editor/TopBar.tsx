//Import Components
import { usePostFiles } from '@hooks/useFiles';
import { useSession } from 'next-auth/react';
import { RiSaveLine } from 'react-icons/ri';
//Import Interfaces
import Data from '../../interfaces/data';

interface Props {
  data: Data;
  callSetData: (data: Data) => void | undefined;
  refresh: number;
  callRefresh: (refresh: number) => void | undefined;
}

export default function TopBar(props: Props): JSX.Element {
  const { data: session } = useSession();

  const { mutate, isLoading } = usePostFiles({
    data: props.data,
    user: session && session.user?.name
  });

  const handleClick = async () => {
    if (session) {
      mutate();
      setTimeout(() => {
        props.callRefresh(props.refresh + 1);
      }, 1500);
    }
  };

  return (
    <div className="mb-5 flex justify-end">
      <button
        className="bg-button text-lg flex items-center justify-center gap-5 w-fit mt-10 "
        onClick={handleClick}
      >
        <RiSaveLine size={30} />
        <p>{isLoading ? 'Saving...' : 'Save'}</p>
      </button>
    </div>
  );
}
