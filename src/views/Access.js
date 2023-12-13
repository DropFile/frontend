import React, { useState } from "react";
import FileModal from "../components/FileModal";
import axios from "axios";
import { Link } from "react-router-dom";
import env from "../constants";

function Access() {
  const [inputToken, setInputToken] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");

  const handleTokenChange = (event) => {
    setInputToken(event.target.value);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
  //   const matchedFiles = uploadedFiles.filter((uploadedFile) => uploadedFile.token === inputToken);

  //   setUploadedFiles(matchedFiles);
  // };
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.get(`${env.BASE_URL}/file?key=${inputToken}`).then((response) => {
      console.log(response.data)
      const data = response.data.data;
      setUploadedFiles(data.split(","));
    });
  };

  // const viewFile = (fileBlob) => {
  //   const url = fileBlob;
  //   window.open(url, '_blank');
  // };

  const viewFile = (fileName) => {
    setSelectedFile(fileName);
  };

  const closeModal = () => {
    setSelectedFile(null);
  };

  return (
    <div className="h-screen w-full  bg-[#E5F6FF] flex items-center justify-center">
      <div className="flex flex-col text-[#3056D3]  w-4/5 h-4/5 items-center ">
        <Link Link to="/">
          <div className="text-5xl font-bold text-center mb-5">FileShare</div>
        </Link>

        <div className="container h-full mx-auto max-w-screen-lg relative flex flex-col bg-white shadow-xl rounded-md p-8 ">
          <div className="h-full overflow-auto p-8 w-full flex flex-col items-center mb-3 ">
            <div className="text-md font-semibold mb-3">
              Access video by entering token
            </div>

            <form
              class="relative flex h-10 w-full min-w-[200px] max-w-[24rem] mb-4 "
              onSubmit={handleSubmit}
            >
              <button
                class="!absolute right-1 top-1 select-none rounded bg-blue-700 py-2 px-4 text-center align-middle text-xs font-sans font-semibold  text-white shadow-md shadow-blue-700/20 transition-all hover:shadow-lg hover:shadow-blue-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                data-ripple-light="true"
                type="submit"
              >
                Access
              </button>
              <input
                type="token"
                class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-700 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                value={inputToken}
                onChange={handleTokenChange}
                placeholder=" "
                required
              />
              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-700 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-700 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-700 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Token
              </label>
            </form>

            <div className="pr-4 w-full uploaded-files-list grid grid-cols-4 gap-x-8 gap-y-4 items-start overflow-auto">
              {/* {uploadedFiles.map(({ fileName, fileBlob }, index) => (
                <div key={index} className='border-2 h-12 w-1/4 p-3 rounded-lg'>
                  <button onClick={() => viewFile(fileBlob)}>{fileName} </button>
                </div>
              ))} */}
              {uploadedFiles.map((fileName, index) => (
                <div
                  key={index}
                  className="border-2 border-slate-100 shadow-sm bg-slate-100 h-12 p-3 rounded-lg flex items-center justify-start text-gray-600 hover:text-blue-600"
                >
                  <div className="w-6 h-6 bg-gray-300 rounded-full mr-3"></div>
                  <button onClick={() => viewFile(fileName)}>
                    {fileName.length > 12
                      ? `${fileName.slice(0, 12)}...`
                      : fileName}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {selectedFile && (
          <FileModal
            filename={selectedFile}
            token={inputToken}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
}

export default Access;
