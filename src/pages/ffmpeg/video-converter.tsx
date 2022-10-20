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

import CustomDropdown from '@components/CustomUi/CustomDropdown';
import FileUploader from '@components/FileUploader/FileUploader';

// List of all the video formats supported for conversion
const formats = [
  {
    label: 'MP4',
    value: 'mp4'
  },
  {
    label: 'AVI',
    value: 'avi'
  },
  {
    label: 'MKV',
    value: 'mkv'
  },
  {
    label: 'WMV',
    value: 'wmv'
  },
  {
    label: 'WEBM',
    value: 'webm'
  }
];

// Initialize the binary
const ffmpeg = createFFmpeg({
  log: true,
  mainName: 'main',
  corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js'
});

const VideoConverter: NextPage = () => {
  // To make sure the user is logged in to access this page
  useSession({
    required: true
  });

  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState<any>(null);
  const [result, setResult] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [fromFormat, setFromFormat] = useState(formats[0]);
  const [toFormat, setToFormat] = useState(formats[1]);
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
    setResult('');
  }, [video]);

  // Once the conversion is successful scroll to the bottom section
  useEffect(() => {
    if (result) {
      setIsConverting(false);
      toast.success('Successfully converted!');
      scrollIntoView({ alignment: 'center' });
    }
  }, [result]);

  // Function to convert
  const convertVideo = async () => {
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
    const fileInMemory = 'test.' + fromFormat.value;
    const outFile = 'out.' + toFormat.value;
    ffmpeg.FS('writeFile', fileInMemory, await fetchFile(video));

    // Run the FFMpeg command
    await ffmpeg.run('-i', fileInMemory, outFile);

    // Read the result
    const data = ffmpeg.FS('readFile', outFile);

    // Create a URL
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: 'video/' + toFormat.value })
    );

    // Set the variable
    setResult(url);
  };

  // Function to download the converted video
  const downloadResult = () => {
    FileSaver.saveAs(result);
  };

  // To handle change of source video format
  const handleFromChange = (val: string) => {
    const option = formats.find(item => item.value === val);
    setFromFormat(option!);
  };

  // To handle change of target video format
  const handleToChange = (val: string) => {
    const option = formats.find(item => item.value === val);
    setToFormat(option!);
  };

  return (
    <div className="w-full min-h-screen p-14 pt-16 flex justify-center">
      <Head>
        <title>Video Converter</title>
        <link rel="icon" href="/thunder-hero.png" />
      </Head>

      {/* If ffmpeg is loaded the render the UI, else show loader */}
      {ready ? (
        <div className="lg:w-[50%] w-full">
          <FileUploader video={video} setVideo={video => setVideo(video)} />
          <div className="mt-10 flex flex-col lg:flex-row lg:items-center justify-between">
            <div>
              <p className="mb-2 text-2xl text-gray-300">From</p>
              <CustomDropdown
                options={formats}
                onChange={handleFromChange}
                value={fromFormat}
                height="h-12"
              />
            </div>
            <div className="mt-8 lg:mt-0">
              <p className="mb-2 text-2xl text-gray-300">To</p>
              <CustomDropdown
                options={formats}
                onChange={handleToChange}
                value={toFormat}
                height="h-12"
              />
            </div>
          </div>

          <button
            className={`h-12 bg-button text-lg flex items-center justify-center gap-5 w-full mt-10 ${
              !video && 'opacity-40 cursor-not-allowed'
            } `}
            onClick={convertVideo}
          >
            {isConverting ? (
              <>
                <Loader size={30} color="white" />
                <p>Converting...</p>
              </>
            ) : (
              <>
                <BiTransferAlt size={40} />
                <p>Convert</p>
              </>
            )}
          </button>

          {/* Show the result section only after the conversion is successful */}
          {result && (
            <div className="w-full mt-20">
              <h2 className="lg:text-3xl text-xl font-semibold">
                Converted Video
              </h2>
              <div className="relative h-96 w-full" ref={targetRef}>
                <video
                  controls
                  src={result}
                  className="h-full w-full object-contain"
                />
              </div>
              <button
                className="h-12 bg-button text-lg flex items-center justify-center gap-5 w-full mt-10 "
                onClick={downloadResult}
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

export default VideoConverter;
