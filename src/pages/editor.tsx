import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

const Editor: NextPage = () => {
  useSession({
    required: true
  });

  return (
    <div className="w-full min-h-screen p-14 pt-16">
      <Head>
        <title>Editor</title>
        <link rel="icon" href="/thunder-hero.png" />
      </Head>
    </div>
  );
};

export default Editor;
