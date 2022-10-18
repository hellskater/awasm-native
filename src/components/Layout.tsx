import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from '@components/Header/Header';

type props = {
  children: typeof React.Children | ReactNode;
};

const Layout = ({ children }: props) => {
  return (
    <div className={`relative min-h-screen h-screen w-full text-white pb-safe`}>
      <div className="bg-color">
        <div className="fixed top-0 z-10">
          <Header />
        </div>

        <Toaster
          position="bottom-right"
          toastOptions={{
            className:
              'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white'
          }}
        />

        <>{children}</>
      </div>
    </div>
  );
};

export default Layout;
