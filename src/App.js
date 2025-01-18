import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Page1 from './filter/Page1'; // 第1個頁面
import Page2 from './filter/Page2'; // 第2個頁面
import Parent_mobx from './filter/Parent_mobx';

import Parent from './filter_usestate/Parent';
const App = () => (
  <Router>
    
    <Routes>
    <Route path="/" element={<Parent />} />
    <Route path="/Parent_mobx" element={<Parent_mobx />} />

      <Route path="/page1" element={<Page1 />} />
      <Route path="/page2" element={<Page2 />} />
    </Routes>
  </Router>
);

export default App;
