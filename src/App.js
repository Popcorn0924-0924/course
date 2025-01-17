import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Page1 from './filter/Page1'; // 第1個頁面
import Page2 from './filter/Page2'; // 第2個頁面

const App = () => (
  <Router>
    <nav>
      <Link to="/page1">頁面 1</Link>
      <Link to="/page2">頁面 2</Link>
    </nav>
    <Routes>
      <Route path="/page1" element={<Page1 />} />
      <Route path="/page2" element={<Page2 />} />
    </Routes>
  </Router>
);

export default App;
