import type { NextPage } from 'next';
import Head from 'next/head';
import Thunder from '@assets/thunder-hero.png';
import Image from 'next/image';

const IndexPage: NextPage = () => {
  return (
    <div className="h-screen w-full p-14 pt-16 relative">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Hero section */}

      <section className="mt-14 flex justify-between items-center">
        <header className="text-7xl">
          <p className="">Native SPEED</p>
          <p className="mt-5">on the web.</p>
          <p className="text-base mt-12 leading-[1.9]">
            Run your resource heavy apps seamlessly on your favourite browser.
          </p>
        </header>

        <div className="relative h-[30rem] w-[29rem]">
          <Image
            src={Thunder}
            layout="fill"
            className="h-full w-full object-cover brightness-150"
          />
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
