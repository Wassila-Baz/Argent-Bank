import React from 'react';
import './HeaderAccount.css';

const HeaderAccount = () => {
  return (
    <div className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />Tony Jarvis!</h1>
        <button className="edit-button">Edit Name</button>
      </div>
    </div>
  );
};

export default HeaderAccount;
