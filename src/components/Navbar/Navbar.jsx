import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; //hooks de React Redux permettant d'accéder à l'état global et de dispatcher des actions Redux.
import "../Navbar/Navbar.css";
import logo from "../../assets/argentBankLogo.webp";
import { logoutUser } from '../../action/user.action'; // Une action Redux pour gérer la déconnexion de l'utilisateur.

const Navbar = () => {
  const userProfile = useSelector(state => state.user.userProfile); // Utilise useSelector pour accéder à userProfile
  const dispatch = useDispatch(); // 

const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    dispatch(logoutUser()); // Déclenche l'action logoutUser
    console.log("Déconnexion effectuée"); 
};
//condition pour afficher le logout uniquement si l'utilisateur est connecte"r 

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
        {userProfile ? userProfile.userName : 'Sign In'}
      </Link>
      {/* Condition pour afficher le bouton de déconnexion uniquement si l'utilisateur est connecté */}
      {userProfile && (
        <Link to="/" onClick={handleLogout} className="logout">
          <i className='fa fa-sign-out'></i>
          Sign Out
        </Link>
      )}
    </div>
  </nav>
);
};
export default Navbar;
