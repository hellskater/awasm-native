import { TfiVideoClapper } from 'react-icons/tfi';
import { AiOutlineClear } from 'react-icons/ai';
import { useDropzone } from 'react-dropzone';
import { useEffect } from 'react';

type Props = {
  video: any;
  setVideo: (video: any) => void;
};

const FileUploader = ({ video, setVideo }: Props) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'video/*': ['.mkv', '.avi', '.mp4', '.wmv', '.webm']
    },
    onDrop: acceptedFiles => {
      setVideo(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )[0]
      );
    }
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    if (video) {
      return () => URL.revokeObjectURL(video.preview);
    } else return;
  }, []);

  return (
    <div className="mt-12">
      <div className="flex flex-col lg:flex-row justify-between">
        <p className="lg:text-3xl text-xl font-semibold mb-10">Upload Video</p>
        <button
          className="bg-button w-fit h-fit lg:text-base text-sm flex items-center text-white justify-center gap-2"
          onClick={() => setVideo(null)}
        >
          <AiOutlineClear size={20} />
          <p>Clear</p>
        </button>
      </div>

      <div
        {...getRootProps({
          className:
            'dropzone w-full border-[0.2px] border-dashed p-5 bg-gray-900 rounded-xl dark:border-white flex flex-col gap-5 justify-center text-center items-center mt-5 cursor-pointer overflow-hidden'
        })}
      >
        <input {...getInputProps()} />

        {video ? (
          <video
            controls
            src={video.preview}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-44 flex-col justify-center items-center">
            <p className="text-gray-500 mb-5 text-2xl">
              Click to upload your file
            </p>
            <p className="text-center">MP4, AVI, MKV, WMV or WEBM </p>
            <TfiVideoClapper className="text-5xl mt-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
