import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        /* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */
        <Route path="*" element={<NotFound />} /> {/* Page 404 */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
