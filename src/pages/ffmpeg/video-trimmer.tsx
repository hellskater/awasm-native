import FileUploader from '@components/FileUploader/FileUploader';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { Loader } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import FileSaver from 'file-saver';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiCut } from 'react-icons/bi';
import { BsDownload } from 'react-icons/bs';

const ffmpeg = createFFmpeg({
  log: true,
  mainName: 'main',
  corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js'
});

const VideoTrimmer: NextPage = () => {
  useSession({
    required: true
  });
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState<any>(null);
  const [result, setResult] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [fromDuration, setFromDuration] = useState<any>(null);
  const [toDuration, setToDuration] = useState<any>(null);
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60
  });

  const load = async () => {
    try {
      await ffmpeg.load();
      setReady(true);
    } catch (err) {
      // eslint-disable-next-line
      console.error(err);
    }
  };

  useEffect(() => {
    if (!ffmpeg.isLoaded()) {
      load();
    }
  }, []);

  useEffect(() => {
    setResult('');
  }, [video]);

  useEffect(() => {
    if (result) {
      setIsConverting(false);
      toast.success('Successfully converted!');
      scrollIntoView({ alignment: 'center' });
    }
  }, [result]);

  const trimVideo = async () => {
    if (!video) {
      toast.error('Please upload a video first!');
      return;
    }
    if (isConverting) {
      return;
    }
    setIsConverting(true);
    // Write the file to memory
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));

    // Run the FFMpeg command
    await ffmpeg.run(
      '-i',
      'test.mp4',
      '-ss',
      fromDuration.toString(),
      '-t',
      toDuration.toString(),
      'out.mp4'
    );

    // Read the result
    const data = ffmpeg.FS('readFile', 'out.mp4');

    // Create a URL
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: 'video/mp4' })
    );
    setResult(url);
  };

  const downloadResult = () => {
    FileSaver.saveAs(result);
  };

  const handleFromDuration = (val: string) => {
    setFromDuration(val);
  };

  const handleToDuration = (val: string) => {
    setToDuration(val);
  };

  return (
    <div className="w-full min-h-screen p-14 pt-16 flex justify-center">
      <Head>
        <title>Video Converter</title>
        <link rel="icon" href="/thunder-hero.png" />
      </Head>
      {ready ? (
        <div className="lg:w-[50%] w-full">
          <FileUploader video={video} setVideo={video => setVideo(video)} />
          <div className="mt-10 flex flex-col lg:flex-row lg:items-center justify-between">
            <div>
              <p className="mb-2 text-2xl text-gray-300">From</p>
              <input
                type="number"
                className="outline-none bg-gray-900 h-10 rounded-lg border-[1px] border-gray-500 p-4 w-full"
                value={fromDuration}
                onChange={e => handleFromDuration(e.target.value)}
              />
            </div>
            <div className="mt-8 lg:mt-0">
              <p className="mb-2 text-2xl text-gray-300">To</p>
              <input
                type="number"
                className="outline-none bg-gray-900 h-10 rounded-lg border-[1px] border-gray-500 p-4 w-full"
                value={toDuration}
                onChange={e => handleToDuration(e.target.value)}
              />
            </div>
          </div>

          <button
            className={`h-12 bg-button text-lg flex items-center justify-center gap-5 w-full mt-10 ${
              !video && 'opacity-40 cursor-not-allowed'
            } `}
            onClick={trimVideo}
          >
            {isConverting ? (
              <>
                <Loader size={30} color="white" />
                <p>Trimming...</p>
              </>
            ) : (
              <>
                <BiCut size={40} />
                <p>Trim</p>
              </>
            )}
          </button>

          {result && (
            <div className="w-full mt-20">
              <h2 className="lg:text-3xl text-xl font-semibold">
                Trimmed Video
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

export default VideoTrimmer;
