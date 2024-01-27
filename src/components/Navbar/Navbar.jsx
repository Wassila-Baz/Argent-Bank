import React from 'react';
import { Link } from 'react-router-dom';
import "../Navbar/Navbar.css"
import logo from "../../assets/argentBankLogo.png"

const Navbar = () => {
  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={logo} alt='Argent Bank Logo' />
      </Link>
      <div>
        <Link to="/sign-in" className="main-nav-item">
          <i className='fa fa-user-circle'></i>
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
