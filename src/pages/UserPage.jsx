import React from 'react';
import TopBar from '../components/TopBar';
import UserDataGridComponent from '../components/UserDataGridComponent';

const UserPage = () => {
  return (
    <>
      <TopBar />
      <div style={{ padding: '16px' }}>
        <UserDataGridComponent />
      </div>
    </>
  );
};

export default UserPage;
