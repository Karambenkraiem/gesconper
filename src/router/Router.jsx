import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      {/* <div style={{ display: 'flex' }}> 
        <Main /> 
        <div style={{ marginLeft: 240, flexGrow: 1, padding: '16px' }}> */}
      <Routes>        
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/auth" element={<AuthentificationPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile/:userId" element={<ProfilePage />} /> 
        <Route path="/allconge" element={<AllCongePage />} /> 
        <Route path="/conges/:userId" element={<CongePage />} />
        <Route path="*" element={<NotFound />} /> {/* Page 404 */}        
      </Routes>
      {/* </div> </div> */}
    </Router>
  );
};

export default AppRouter;
