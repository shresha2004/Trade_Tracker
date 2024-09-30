

import React from 'react';
import './Footer.css'; 
import {Link}  from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer bg-body-tertiary">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5 className="footer-title">Trade Tracker</h5>
            <p className="footer-text">
              &copy; {new Date().getFullYear()} Trade Tracker. All rights reserved.
            </p>
          </div>
          <div className="col-md-6">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/#about">About</Link></li>
              <li><Link to="/#service">Services</Link></li>
              <li><Link to="/#contact">Contact</Link></li>
            </ul>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
