import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const FileModal = ({ token, filename, onClose }) => {
  const videoRef = useRef(null);

  // var newFileName = "";
  // let index = filename.length - 1;
  // for (; index >= 0; index--) {
  //   if (filename[index] === ".") break;
  // }

  // for (let i = 0; i < index; i++) {
  //   newFileName += filename[i];
  // }
  // console.log(newFileName);

  useEffect(() => {
    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(
        `http://localhost:8080/file/fetch/${token}/${filename}.m3u8`
      );
      hls.attachMedia(video);
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 px-20 py-4 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg p-4 border-2 w-full h-full flex flex-col items-center justify-center">
        <div className=" w-full flex justify-end mb-4">
          <button
            className="text-gray-500 bg-slate-100 rounded-lg py-2 px-4 font-medium text-base hover:bg-red-500 hover:text-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        {/* <iframe title="File Viewer" src={fileBlob} className="w-full h-5/6" /> */}
        <video ref={videoRef} controls className="w-full h-5/6">
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default FileModal;
