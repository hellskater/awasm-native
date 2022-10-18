import type { NextPage } from 'next';
import Head from 'next/head';
import Thunder from '@assets/thunder-hero.png';
import Image from 'next/image';
import Python from '@assets/python-logo.png';
import Ffmpeg from '@assets/ffmpeg.png';
import Vim from '@assets/vim-logo.png';
import { RiVideoUploadLine } from 'react-icons/ri';
import { BsCodeSlash } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';
import Link from 'next/link';

const IndexPage: NextPage = () => {
  return (
    <div className="w-full p-14 pt-16 relative">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/thunder-hero.png" />
      </Head>
      {/* Hero section */}

      <section className="mt-32 lg:mt-14 flex justify-between items-center">
        <header className="text-4xl lg:text-7xl font-semibold">
          <p className="leading-[0.8] text-center lg:text-start">
            Native SPEED
          </p>
          <p className="mt-5 text-center lg:text-start ">on the web.</p>
          <p className="text-base mt-12 leading-[1.9] text-center lg:text-start">
            Run your resource heavy apps seamlessly on your favourite browser.
          </p>
        </header>

        <div className="hidden lg:flex relative h-[30rem] w-[29rem]">
          <Image
            src={Thunder}
            layout="fill"
            className="h-full w-full object-cover brightness-150"
          />
        </div>
      </section>

      <section className="mt-32">
        <h2 className="font-semibold text-5xl text-center lg:text-start">
          WASM Apps
        </h2>
        <div className="mt-16 flex gap-20 flex-wrap items-center justify-center lg:justify-start">
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
                <p>Codec Formatter</p>
              </div>
            </div>
          </Link>
          <Link href="/vim">
            <div className="flex flex-col justify-center items-center hover:bg-gray-800 rounded-xl p-5 cursor-pointer">
              <div className="relative h-32 w-32">
                <Image
                  src={Vim}
                  layout="fill"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex items-center gap-4 mt-5">
                <BiEditAlt className="text-3xl" />
                <p>Vim Editor</p>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
