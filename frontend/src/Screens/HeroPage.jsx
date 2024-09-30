import React from "react";
import { useEffect } from "react";
import RegistrationForm from "../Components/RegistrationForm";
import LoginForm from "../Components/LoginForm";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../Layouts/Footer";
import Video from "../assets/HeroPageVideo.mp4";
import { Link } from 'react-router-dom'; // Resolving the merge by keeping this import

const HeroPage = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigate = useNavigate();
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setShowRegistrationForm(true);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowLoginForm(true);
  };

  const closeLoginForm = () => {
    setShowLoginForm(false);
    navigate('/LandingPage');
  };

  const closeRegisterForm = () => {
    setShowRegistrationForm(false);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row mb-5">
          <nav className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container-fluid d-flex justify-content-between">
              <Link className="navbar-brand btn btn-success heading" to="#">
                Trade Tracker
              </Link>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarContent"
                aria-controls="navbarContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              {/* Collapsible Content */}
              <div className="collapse navbar-collapse" id="navbarContent">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/" className="nav-link fw-bolder px-3 altercss ms-5 me-5">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="#about" className="nav-link fw-bolder px-3 altercss ms-5 me-5">
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="#service" className="nav-link fw-bolder px-3 altercss ms-5 me-5">
                      Service
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="#contact" className="nav-link fw-bolder px-3 altercss ms-5 me-5">
                      Contact
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link onClick={handleRegisterClick} className="nav-link fw-bolder px-3 altercss ms-5 me-5">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link onClick={handleLoginClick} className="nav-link fw-bolder px-3 altercss ms-5">
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className="row mt-5">
          <div className="col-sm-12 col-md-7">
            <h1 className="curlyText text-center intro mt-5 mb-5">
              Track, Learn, and Trade with Confidence
            </h1>
            <p className="fs-5 mt-5">
              Welcome to Trade Tracker – your ultimate tool for managing trades, analyzing performance, and staying on top of the market. Track your trades, upload charts, and gain insights to enhance your trading strategy. Stay organized, make informed decisions,
              and grow your portfolio with ease.
            </p>
            <div className="mt-5 d-flex justify-content-center align-items-center">
              <Link to="/LandingPage" className="getStartedBtn ">
                Get Started
              </Link>
            </div>
            <video className="mt-4 mb-5" src={Video} autoPlay loop muted />
          </div>

          <div className="col-sm-12 col-md-5 position-relative">
            <img
              src="https://res.cloudinary.com/dtyu88isr/image/upload/v1726460573/TradingJournal/aoljdijto93gz26owgjg.jpg"
              alt="bitcoin"
              className="heroImg position-relative"
            />
          </div>
        </div>
        <div className="card">
          <img
            src="https://res.cloudinary.com/dtyu88isr/image/upload/v1726720576/TradingJournal/o1wvdzsoeyff1or2ct00.png"
            className="card-img-top rounded details"
            alt="Trade Image"
          />
        </div>
        <section id="about">
          <div className="card mt-2 details">
            <div className="card-body">
              <h5 className="card-title">About</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">About trade Tracker</h6>
              <p className="card-text">
                Welcome to Trade Tracker – your comprehensive platform for tracking and analyzing stock market trades. Whether you're a seasoned trader or just starting out, our website is designed to help you maintain a detailed trading journal, analyze performance, and make informed decisions.
              </p>
              <br />
              Key Features:
              <ul>
                <li>Stock Portfolio Tracking: Search for Indian stocks, build and maintain a portfolio, and monitor your investments all in one place.</li>
                <li>Trade Journal: Record every trade, including key details like entry/exit points, strategy, and upload charts to document your decision-making process.</li>
                <li>Performance Analytics: Visualize your trading performance with easy-to-understand charts and insights to help refine your strategies.</li>
                <li>User-Friendly Interface: Simple, intuitive design allows you to focus on the markets rather than the tools.</li>
                <li>
                  Our goal is to provide traders with the tools they need to succeed in the fast-paced world of stock market trading. Start tracking your trades today and take your trading game to the next level!
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section id="service">
          <div className="card mt-3 details">
            <div className="card-body">
              <h5 className="card-title">Service</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">Our Services</h6>
              <p className="card-text">
                At Trade Tracker, we offer a comprehensive set of tools designed to enhance your stock market trading experience. Our platform allows you to meticulously track your trades through a detailed trade journal, where you can log key details like entry/exit prices, trade types, strategies, and even upload chart screenshots for better visualization. You can also build and manage a stock portfolio with live data from the Indian stock market, keeping you informed about your investments. With our advanced performance analytics, you can visualize trade outcomes, assess profitability, and refine your trading strategies. The search and filter functionality allows you to quickly navigate through your trading history, helping you make data-driven decisions. Whether you're a beginner or an experienced trader, our services are designed to help you succeed in the market.
              </p>
            </div>
          </div>
        </section>
        <section id="contact">
          <div className="card mt-3 mb-3 details">
            <div className="card-body">
              <h2 className="card-title">Contact Us</h2>
              <p>
                Have questions or need assistance? Reach out to us through any of the following methods:
              </p>

              <ul>
                <li>
                  <strong>Email:</strong> tradetracker@gmail.com
                </li>
                <li>
                  <strong>Phone:</strong> +91 9606338467
                </li>
                <li>
                  <strong>Address:</strong> NITTE Campus, 6429, NITTE Meenakshi College Rd, BSF Campus, Yelahanka, Bengaluru, Govindapura, Karnataka 560064
                </li>
              </ul>
            </div>
          </div>
        </section>

        {showRegistrationForm && <RegistrationForm closeRegisterForm={closeRegisterForm} />}
        {showLoginForm && <LoginForm closeLoginForm={closeLoginForm} />}
      </div>

      <Footer />
    </>
  );
};

export default HeroPage;
