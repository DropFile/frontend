import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import env from "../constants";

function Upload() {
  const [files, setFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const [token, setToken] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [copiedMessageVisible, setCopiedMessageVisible] = useState(false);
  const [isLoading,setIsLoading] =useState(false);

  // const handleFileChange = (event) => {
  //   setFiles([...event.target.files]);
  // };

  const allowedFileTypes = [
    "text/plain",
    "image/jpeg",
    "image/png",
    "audio/mp3",
    "video/mp4",
    "application/pdf",
  ];

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    const validFiles = newFiles.filter((file) =>
      allowedFileTypes.includes(file.type)
    );
    setFiles(validFiles);
    const rejected = newFiles.filter(
      (file) => !allowedFileTypes.includes(file.type)
    );
    setRejectedFiles(rejected);
  };

  // const handleUpload = () => {
  //   if (files.length > 0) {
  //     const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
  //     const generatedToken = Math.random().toString(36).substr(2, 9);

  //     for (const file of files) {
  //       uploadedFiles.push({
  //         token: generatedToken,
  //         fileName: file.name,
  //         fileBlob: URL.createObjectURL(file),
  //       });
  //     }

  //     localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));

  //     setToken(generatedToken);
  //     setShowPopup(true);
  //     setTimeout(() => {
  //       setFiles([]);
  //     }, 15 * 60 * 1000);
  //   }
  // };
  const handleUpload = () => {
    if (files.length > 0) {
      setIsLoading(true);
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append(`file-${i}`, files[i]);
      }

      formData.append("numberOfFiles", files.length);

      axios
        .post(`${env.BASE_URL}/file`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        // .then((response) => {
        //   console.log(response.data);
        // });
        .then((response)=>{
          setIsLoading(false);
          setToken(response.data.data.key);
          setShowPopup(true);
          setTimeout(()=>{
            setFiles([]);

          }, 15*60*1000);
        }).catch((error)=>{
          setIsLoading(false);
          console.error("Error uploading files : ", error);
        });
    }
  };

  // const handleClosePopup = () => {
  //   setShowPopup(false);
  //   setCopiedMessageVisible(false);
  // };
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(token);
    setCopiedMessageVisible(true);
    setTimeout(() => {
      setCopiedMessageVisible(false);
      setShowPopup(false);
    }, 0.5 * 1000);
  };

  const handleCancel = () => {
    setFiles([]);
    setToken("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = e.dataTransfer.files;
    if (newFiles.length) {
      setFiles([...newFiles]);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default behavior
  };

  // const handleTokenChange = (event) => {
  //   setInputToken(event.target.value);
  // };
  return (
    <div className="h-screen w-full  bg-[#E5F6FF] flex items-center justify-center overflow-auto">
      <div className="flex flex-col text-[#3056D3] mt-4 w-2/5 h-2/3 items-center">
        <Link Link to="/">
          <div className="text-5xl font-bold text-center mb-5">FileShare</div>
        </Link>

        <div className="container mx-auto max-w-screen-lg relative flex flex-col bg-white shadow-xl rounded-md p-8">
          {/* {showUploadSection ? ( */}
          <div className="">
            <div
              className="border-dashed border-2 border-gray-400 py-14 flex flex-col justify-center items-center h-36"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center ">
                <span>Drag and drop your</span>&nbsp;
                <span>file anywhere or</span>
              </p>
              <input
                id="hidden-input"
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden 
              "
              />
              <button
                id="button"
                className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                onClick={() => document.getElementById("hidden-input").click()}
              >
                Choose files
              </button>
            </div>

            <h1 className="pt-6 pb-3 font-semibold sm:text-md text-gray-900">
              To Upload
            </h1>

            {files.length > 0 && (
              <ul id="gallery" className="flex flex-1 flex-wrap ">
                {files.map((file) => (
                  <li
                    key={file.name}
                    className="h-full w-full text-center flex items-start gap-2"
                  >
                    <img
                      className="w-32 "
                      src={URL.createObjectURL(file)}
                      alt="File thumbnail"
                    />
                    <span className="text-small text-gray-500">
                      {file.name}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {rejectedFiles.length > 0 && (
              <div>
                <h1 className="pt-6 pb-3 font-semibold sm:text-md text-gray-900">
                  Rejected Files
                </h1>
                <ul>
                  {rejectedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end px-8 pb-4 pt-6">
              <button
                id="submit"
                className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
                onClick={handleUpload}
              >
                Upload
              </button>

              <button
                id="cancel"
                className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Pop-up */}
          {showPopup && (
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-30 z-10">
              <div className="bg-white w-1/5 h-2/5 rounded-md shadow-xl flex flex-col items-center justify-center gap-4">
                <div className="text-3xl font-semibold mb-3">Token</div>  
                {copiedMessageVisible ? (
                  <div className="text-green-500 text-lg font-normal">Copied to clipboard!</div>
                ): (<p className="text-xl font-normal">token</p>)}
                <div className="mt-4">
                  <button
                    className="bg-blue-700 text-white rounded-md px-6 py-2  hover:bg-blue-600 shadow-lg hover:shadow-none"
                    onClick={handleCopyToClipboard}
                  >
                    Copy to Clipboard
                  </button>
                  {/* <button
                    className="bg-gray-300 rounded-md px-3 py-1"
                    onClick={handleClosePopup}
                  >
                    Close
                  </button> */}
                </div>
              </div>
            </div>
          )}
          {/* Loading modal */}
        {/* {isLoading && (
          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-30 z-10">
            <div className="bg-white p-8 rounded-md shadow-xl">
              <div className="text-xl font-semibold mb-3">Loading</div>
              <p>Please wait while the files are being uploaded...</p>
            </div>
          </div>
        )} */}
        {isLoading && (
          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-30 z-10">
            <div className="p-8 rounded-md ">
            <div class="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default Upload;
