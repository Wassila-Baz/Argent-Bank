import React from 'react';
import '../Sign-in/Sign-in.css'; // Assurez-vous d'importer le fichier CSS correct

const SignIn = () => {
  return (

      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {/* Placeholder link due to static site */}
          <a href="./user.html" className="sign-in-button">
            Sign In
          </a>
          {/* The button below should be used instead */}
          {/* <button className="sign-in-button">Sign In</button> */}
        </form>
      </section>

  );
};

export default SignIn;
