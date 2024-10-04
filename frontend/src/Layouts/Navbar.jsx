import React, { useContext, useState } from 'react';
import RegistrationForm from '../Components/RegistrationForm';
import LoginForm from '../Components/LoginForm';
import { AuthContext } from '../Contexts/AuthContext';
import TradeWarning from './TradeWarning';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Navbar() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [navbarDropped, setNavbarDropped] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const toggleNavbar = () => {
    setNavbarDropped(!navbarDropped);
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setShowRegistrationForm(true);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowLoginForm(true);
  };

  const closeRegisterForm = () => {
    setShowRegistrationForm(false);
  };

  const closeLoginForm = () => {
    
    setShowLoginForm(false);
    navigate('/LandingPage');
  };

  const handleLogoutClick = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('Email')
    localStorage.removeItem('isAuthenticated');
    navigate('/LandingPage'); 
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark nav-bar-background bg-success justify-content-center">
        <div className="container-fluid">

          <Link className="navbar-brand btn  fw-bold tcolor curlyText" to="#">Trade Tracker</Link>

          <button className="navbar-toggler" type="button" onClick={toggleNavbar} data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">

                <Link className="nav-link fw-bolder" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bolder" to="/LandingPage">Learn</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bolder" to="/ProfitLoss">Portfolio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bolder" aria-current="page" to="/TradingJournal">Trading Journal</Link>

              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              {!isAuthenticated ? (
                <>
                  <li className="nav-item">

                    <Link className="nav-link fw-bolder" to="#" onClick={handleLoginClick}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-bolder" to="#" onClick={handleRegisterClick}>Register</Link>

                  </li>
                </>
              ) : (
                <li className="nav-item">

                  <Link className="nav-link fw-bolder" to="#" onClick={handleLogoutClick}>Logout</Link>

                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {showRegistrationForm && <RegistrationForm closeRegisterForm={closeRegisterForm} />}
      {showLoginForm && <LoginForm closeLoginForm={closeLoginForm} />}
      <TradeWarning navbarDropped={navbarDropped} />
    </>
  );
}

export default Navbar;
