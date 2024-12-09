import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import MesConges from '../pages/MesConges';
import AuthentificationPage from '../pages/AuthentificationPage';
import CongePage from '../pages/CongePage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthentificationPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/mesconges" element={<MesConges />} /> 
        <Route path="/conges/:userId" element={<CongePage />} />
        <Route path="*" element={<NotFound />} /> {/* Page 404 */}
        
      </Routes>
    </Router>
  );
};

export default AppRouter;
