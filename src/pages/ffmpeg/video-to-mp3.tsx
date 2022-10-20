import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { Loader } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import FileSaver from 'file-saver';
import toast from 'react-hot-toast';
import { BiTransferAlt } from 'react-icons/bi';
import { BsDownload } from 'react-icons/bs';

import FileUploader from '@components/FileUploader/FileUploader';

// Initialize the binary
const ffmpeg = createFFmpeg({
  log: true,
  mainName: 'main',
  corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js'
});

const VideoToMp3: NextPage = () => {
  // To make sure the user is logged in to access this page
  useSession({
    required: true
  });

  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState<any>(null);
  const [audio, setAudio] = useState('');
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
    setAudio('');
  }, [video]);

  // Once the conversion is successful scroll to the bottom section
  useEffect(() => {
    if (audio) {
      setIsConverting(false);
      toast.success('Successfully converted!');
      scrollIntoView({ alignment: 'center' });
    }
  }, [audio]);

  // Function to convert
  const convertToAudio = async () => {
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
      '-vn',
      '-acodec',
      'libmp3lame',
      '-ar',
      '44100',
      '-b:a',
      '96k',
      'out.mp3'
    );

    // Read the result
    const data = ffmpeg.FS('readFile', 'out.mp3');

    // Create a URL
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: 'audio/mp3' })
    );

    // Set the variable
    setAudio(url);
  };

  // Function to download the MP3
  const downloadAudio = () => {
    FileSaver.saveAs(audio);
  };

  return (
    <div className="w-full min-h-screen p-14 pt-16 flex justify-center">
      <Head>
        <title>audio Maker</title>
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
            onClick={convertToAudio}
          >
            {isConverting ? (
              <>
                <Loader size={30} color="white" />
                <p>Converting...</p>
              </>
            ) : (
              <>
                <BiTransferAlt size={40} />
                <p>Convert to MP3</p>
              </>
            )}
          </button>

          {/* Show the result section only after the conversion is successful */}
          {audio && (
            <div className="w-full mt-20">
              <h2 className="lg:text-3xl text-xl font-semibold">
                Converted audio
              </h2>
              <div className="relative h-20 w-full" ref={targetRef}>
                <audio
                  src={audio}
                  controls
                  className="h-full w-full object-contain"
                />
              </div>
              <button
                className="h-12 bg-button text-lg flex items-center justify-center gap-5 w-full mt-10 "
                onClick={downloadAudio}
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

export default VideoToMp3;
