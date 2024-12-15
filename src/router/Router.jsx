import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/UserPage';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import ProfilePage from '../pages/ProfilePage';
import AuthentificationPage from '../pages/AuthentificationPage';
import CongePage from '../pages/CongePage';
import AllCongePage from '../pages/AllCongePage';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/userPage" element={<UserPage />} />
        <Route path="/auth" element={<AuthentificationPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile/:userId" element={<ProfilePage />} /> 
        <Route path="/allconge" element={<AllCongePage />} /> 
        <Route path="/conges/:userId" element={<CongePage />} />
        <Route path="*" element={<NotFound />} /> {/* Page 404 */}
        
      </Routes>
    </Router>
  );
};

export default AppRouter;
