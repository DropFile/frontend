import React, { useState ,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Upload from './views/Upload.js'
import Access from './views/Access.js';


function HomePage() {
  return (
    <div className='h-screen w-full  bg-[#E5F6FF] flex items-center justify-center '>
      <div className='flex flex-col text-[#3056D3] w-2/5 h-2/3 items-center mt-4'>
          <div className='mb-16'>
            <h1 className='text-5xl font-bold text-center mb-5 '>
              FileShare
            </h1>
            <h3 className='text-2xl font-semibold text-center '>
              Lets you to upload and access files temporarily
            </h3>
          </div>
          <div className='flex w-3/5 items-center justify-between'>
            <div className='flex items-center justify-center text-white font-semibold text-xl h-36 w-36 rounded-lg border border-b-2 shadow-md bg-blue-500 hover:bg-blue-600'>
              <Link Link to="/upload">
                Upload
              </Link>
            </div>
            <div className='flex items-center justify-center text-white font-semibold text-xl h-36 w-36 rounded-lg border border-b-2 shadow-md bg-blue-500 hover:bg-blue-600'>
              <Link Link to="/access">
                Access
              </Link>
            </div>
          </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/access" element={<Access />} />
      </Routes>
    </Router>
  );
}

export default App;
