import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { Loader } from '@mantine/core';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const ffmpeg = createFFmpeg({
  log: true,
  mainName: 'main',
  corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js'
});

const GifMaker: NextPage = () => {
  useSession({
    required: true
  });
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState<any>(null);
  const [gif, setGif] = useState('');

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

  const convertToGif = async () => {
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
    setGif(url);
  };

  ffmpeg.setProgress(({ ratio }) => {
    // eslint-disable-next-line
    console.log(ratio);
  });
  return (
    <div className="w-full min-h-screen p-14 pt-16">
      <Head>
        <title>GIF Maker</title>
        <link rel="icon" href="/thunder-hero.png" />
      </Head>
      {ready ? (
        <div className="">
          {video && (
            <video
              controls
              width="250"
              src={URL.createObjectURL(video)}
            ></video>
          )}

          <input
            type="file"
            onChange={e => setVideo(e.target.files?.item(0))}
          />

          <h3>Result</h3>

          <button onClick={convertToGif}>Convert</button>

          {gif && <img src={gif} width="250" />}
        </div>
      ) : (
        <div className="h-[75vh] w-screen flex justify-center items-center">
          <Loader variant="bars" size={60} color="cyan" />
        </div>
      )}
    </div>
  );
};

export default GifMaker;
