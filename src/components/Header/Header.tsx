import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="w-full h-10 bg-header flex justify-between items-center py-8 px-4 md:px-10 lg:px-14 fixed top-0 left-0 z-[99999]">
      <Link href="/">
        <div className="font-mono font-semibold text-2xl tracking-widest text-gray-200 cursor-pointer">
          AWASM
        </div>
      </Link>
    </header>
  );
};

export default Header;
