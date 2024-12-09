import React from 'react';
import TopBar from '../components/TopBar';
import UserDataGridComponent from '../components/UserDataGridComponent';

const Home = () => {
  return (
    <>
      <TopBar />
      <div style={{ padding: '16px' }}>
        <UserDataGridComponent />
      </div>
    </>
  );
};

export default Home;
