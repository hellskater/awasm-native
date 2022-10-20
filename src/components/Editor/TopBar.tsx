import { useSession } from 'next-auth/react';
import { RiSaveLine } from 'react-icons/ri';

import { usePostFiles } from '@hooks/useFiles';
import Data from '@interfaces/data';

type Props = {
  data: Data;
};

const TopBar = ({ data }: Props) => {
  const { data: session } = useSession();

  // React query hook to save the changes in database
  const { mutate, isLoading } = usePostFiles({
    data,
    user: (session && session.user?.name) as string
  });

  const handleClick = async () => {
    if (session) {
      mutate();
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
};

export default TopBar;
