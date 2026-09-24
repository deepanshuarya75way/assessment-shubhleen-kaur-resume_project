import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './Navbar.css';
import user_context from '../UseContext';

const Navbar = () => {
  // 1. Get the login state from your Context
  const { islogin, notlogin } = useContext(user_context);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['token','username']);

  // 2. Function to handle logging out
  const handleLogout = () => {
    removeCookie('token', { path: '/' });
    removeCookie('username', { path: '/' });
    notlogin(false);                     
    navigate('/');            
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">ResumeAI</Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/features">Features</Link></li>
        <li><Link to="/pricing">Pricing</Link></li>
        {/* <li><Link to="/templates">Templates</Link></li> */}
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {islogin && <li><Link to="/dashboard">Dashboard</Link></li>}
      </ul>

      <div className="nav-actions">
        {islogin ? (
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="login-link">Log in</Link>
            <Link to="/signup" className="btn-get-started">Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;