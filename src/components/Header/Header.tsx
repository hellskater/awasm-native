import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

const Header = () => {
  const { data: session } = useSession(); // User data

  const handleLogin = () => {
    signIn();
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <header className="w-full h-10 bg-header flex justify-between items-center py-8 px-4 md:px-10 lg:px-14 fixed top-0 left-0 z-[99999]">
      <Link href="/">
        <div className="font-mono font-semibold text-2xl tracking-widest text-gray-200 cursor-pointer">
          AWASM
        </div>
      </Link>

      {/* If user is not logged in then show login button other wise user profile and logout button */}

      {!session ? (
        <button className="bg-button" onClick={handleLogin}>
          Login
        </button>
      ) : (
        <div className="flex items-center">
          <div className="relative h-10 w-10 rounded-full overflow-hidden">
            <Image
              src={session.user?.image!}
              layout="fill"
              className="h-full w-full object-contain"
            />
          </div>
          <p className="ml-2 text-sm">{session.user?.name}</p>
          <button className="bg-button ml-4" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
