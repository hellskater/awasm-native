import type { NextPage } from 'next';
import Head from 'next/head';

const IndexPage: NextPage = () => {
  return (
    <div className="h-screen w-full">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p className="text-green-400">Hello</p>
    </div>
  );
};

export default IndexPage;
