import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../action/user.action';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(true); // Mise à true par défaut, affiche la baniere si
  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loading);
  const error = useSelector(state => state.user.error);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      if (!email || !password) {
        setShowError(true);
        return;
      }

      await dispatch(loginUser(email, password, navigate));
    } catch (error) {
      console.error('API Error:', error);
      setShowError(true);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        {error && showError && ( 
          <div role="alert" className="banner-error">
            Error: {error}
          </div>
        )}
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="button" className="sign-in-button" onClick={handleSignIn} disabled={loading}>
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default SignIn;
