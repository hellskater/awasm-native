import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { RiVideoUploadLine } from 'react-icons/ri';
import { BsCodeSlash, BsKey } from 'react-icons/bs';

import Thunder from '@assets/thunder-hero.png';
import Python from '@assets/python-logo.png';
import Ffmpeg from '@assets/ffmpeg.png';
import Crypto from '@assets/Cryptography.png';

// LANDING PAGE

const IndexPage: NextPage = () => {
  return (
    <div className="w-full p-14 pt-16 relative">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/thunder-hero.png" />
      </Head>

      {/* Hero section */}
      <section className="mt-32 lg:mt-14 flex justify-between items-center">
        <header className="text-4xl lg:text-7xl font-semibold flex flex-col items-center lg:items-start">
          <p className="leading-[0.8] text-center lg:text-start">
            Native SPEED
          </p>
          <p className="mt-5 text-center lg:text-start ">on the web.</p>
          <p className="text-base mt-12 leading-[1.9] text-center lg:text-start">
            Run your resource heavy apps seamlessly on your favourite browser.
          </p>

          {/* Dashboard button */}
          <Link href="/dashboard">
            <button className="h-12 bg-button text-lg flex items-center justify-center gap-5 w-fit mt-14 ">
              Dashboard
            </button>
          </Link>
        </header>

        {/* Hero image */}
        <div className="hidden lg:flex relative h-[30rem] w-[29rem]">
          <Image
            src={Thunder}
            layout="fill"
            className="h-full w-full object-cover brightness-150"
          />
        </div>
      </section>

      {/* App list section */}
      <section className="mt-32">
        <h2 className="font-semibold text-5xl text-center lg:text-start">
          WASM Apps
        </h2>
        <div className="mt-16 flex gap-20 flex-wrap items-center justify-center lg:justify-start">
          {/* Code editor */}
          <Link href="/editor">
            <div className="flex flex-col justify-center items-center hover:bg-gray-800 rounded-xl p-5 cursor-pointer">
              <div className="relative h-32 w-32">
                <Image
                  src={Python}
                  layout="fill"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex items-center gap-4 mt-5">
                <BsCodeSlash className="text-3xl" />
                <p>Python Code Editor</p>
              </div>
            </div>
          </Link>

          {/* Ffmpeg */}
          <Link href="/ffmpeg">
            <div className="flex flex-col justify-center items-center hover:bg-gray-800 rounded-xl p-5 cursor-pointer">
              <div className="relative h-32 w-32">
                <Image
                  src={Ffmpeg}
                  layout="fill"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex items-center gap-4 mt-5">
                <RiVideoUploadLine className="text-3xl" />
                <p>Video Editor</p>
              </div>
            </div>
          </Link>

          {/* Hash generator */}
          <Link href="/cryptography">
            <div className="flex flex-col justify-center items-center hover:bg-gray-800 rounded-xl p-5 cursor-pointer">
              <div className="relative h-32 w-32">
                <Image
                  src={Crypto}
                  layout="fill"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex items-center gap-4 mt-5">
                <BsKey className="text-3xl" />
                <p>Hash Generator</p>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
