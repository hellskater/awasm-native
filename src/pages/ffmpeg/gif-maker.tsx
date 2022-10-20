import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import { BiTransferAlt } from 'react-icons/bi';
import { BsDownload } from 'react-icons/bs';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { Loader } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import FileSaver from 'file-saver';

import FileUploader from '@components/FileUploader/FileUploader';

// Initialize the binary
const ffmpeg = createFFmpeg({
  log: true,
  mainName: 'main',
  corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js'
});

const GifMaker: NextPage = () => {
  // To make sure the user is logged in to access this page
  useSession({
    required: true
  });

  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState<any>(null);
  const [gif, setGif] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60
  });

  // Function to load ffmpeg
  const load = async () => {
    try {
      await ffmpeg.load();
      setReady(true);
    } catch (err) {
      // eslint-disable-next-line
      console.error(err);
    }
  };

  // On initial render if ffmpeg is not already loaded then load it
  useEffect(() => {
    if (!ffmpeg.isLoaded()) {
      load();
    }
  }, []);

  // If user changes the input video then clear the result
  useEffect(() => {
    setGif('');
  }, [video]);

  // Once the conversion is successful scroll to the bottom section
  useEffect(() => {
    if (gif) {
      setIsConverting(false);
      toast.success('Successfully converted!');
      scrollIntoView({ alignment: 'center' });
    }
  }, [gif]);

  // Function to convert
  const convertToGif = async () => {
    // If no video then return
    if (!video) {
      toast.error('Please upload a video first!');
      return;
    }

    // If it's already running then return
    if (isConverting) {
      return;
    }

    // Make this true to show the loader
    setIsConverting(true);

    // Write the file to memory
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));

    // Run the FFMpeg command
    await ffmpeg.run(
      '-i',
      'test.mp4',
      '-t',
      '2.5',
      '-ss',
      '2.0',
      '-f',
      'gif',
      'out.gif'
    );

    // Read the result
    const data = ffmpeg.FS('readFile', 'out.gif');

    // Create a URL
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: 'image/gif' })
    );

    // Set the variable
    setGif(url);
  };

  // Function to download the GIF
  const downloadGif = () => {
    FileSaver.saveAs(gif);
  };

  return (
    <div className="w-full min-h-screen p-14 pt-16 flex justify-center">
      <Head>
        <title>GIF Maker</title>
        <link rel="icon" href="/thunder-hero.png" />
      </Head>

      {/* If ffmpeg is loaded the render the UI, else show loader */}
      {ready ? (
        <div className="lg:w-[50%] w-full">
          <FileUploader video={video} setVideo={video => setVideo(video)} />
          <button
            className={`h-12 bg-button text-lg flex items-center justify-center gap-5 w-full mt-10 ${
              !video && 'opacity-40 cursor-not-allowed'
            } `}
            onClick={convertToGif}
          >
            {isConverting ? (
              <>
                <Loader size={30} color="white" />
                <p>Converting...</p>
              </>
            ) : (
              <>
                <BiTransferAlt size={40} />
                <p>Convert to GIF</p>
              </>
            )}
          </button>

          {/* Show the result section only after the conversion is successful */}
          {gif && (
            <div className="w-full mt-20">
              <h2 className="lg:text-3xl text-xl font-semibold">
                Converted GIF
              </h2>
              <div className="relative h-96 w-full" ref={targetRef}>
                <Image
                  src={gif}
                  layout="fill"
                  className="h-full w-full object-contain"
                />
              </div>
              <button
                className="h-12 bg-button text-lg flex items-center justify-center gap-5 w-full mt-10 "
                onClick={downloadGif}
              >
                <BsDownload size={30} />
                <p>Download</p>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="h-[75vh] w-screen flex justify-center items-center">
          <Loader variant="bars" size={60} color="orange" />
        </div>
      )}
    </div>
  );
};

export default GifMaker;
