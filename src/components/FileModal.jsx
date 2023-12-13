import React from 'react';

const FileModal = ({ fileBlob, onClose }) => {
    
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 px-20 py-4 flex flex-col items-center justify-center">
        <div className='bg-white rounded-lg p-4 border-2 w-full h-full flex flex-col items-center justify-center'>
            <div className=' w-full flex justify-end mb-4'>
                <button className="text-gray-500 bg-slate-100 rounded-lg py-2 px-4 font-medium text-base hover:bg-red-500 hover:text-white" onClick={onClose}>
                  Close
                </button>
            </div>
            <iframe title="File Viewer" src={fileBlob} className="w-full h-5/6" />
        </div>
    </div>
  );
};

export default FileModal;
