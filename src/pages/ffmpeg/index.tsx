import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Cat from '@assets/cat.gif';
import Convert from '@assets/Convert.webp';
import videoToMp3 from '@assets/videoToMp3.png';
import cutter from '@assets/cutter.png';

// List of all the video tools
const cards = [
  {
    name: 'GIF Maker',
    image: Cat,
    link: '/gif-maker'
  },
  {
    name: 'Video Converter',
    image: Convert,
    link: '/video-converter'
  },
  {
    name: 'Video to mp3 converter',
    image: videoToMp3,
    link: '/video-to-mp3'
  },
  {
    name: 'Video Trimmer',
    image: cutter,
    link: '/video-trimmer'
  }
];

const Ffmpeg = () => {
  // To make sure the user is logged in to access this page
  useSession({
    required: true
  });

  return (
    <div className="w-full min-h-screen p-14 pt-16">
      <Head>
        <title>Ffmpeg</title>
        <link rel="icon" href="/thunder-hero.png" />
      </Head>

      <div className="lg:h-[75vh] lg:w-screen mt-20 lg:mt-0 flex flex-wrap justify-center items-center gap-20">
        {cards.map(({ name, image, link }) => (
          <Link href={'/ffmpeg' + link} key={link}>
            <div className="p-4 rounded-md hover:bg-gray-800 cursor-pointer flex flex-col justify-center items-center">
              <div className="h-36 w-36 relative overflow-hidden rounded-md">
                <Image
                  src={image}
                  layout="fill"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-5 text-center text-gray-300 text-base">{name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Ffmpeg;
