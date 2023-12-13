import React, { useState ,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Upload from './views/Upload.js'
import Access from './views/Access.js';
import HomePage from './views/Home.js';

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
