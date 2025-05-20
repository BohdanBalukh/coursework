import React from 'react';
import '../styles/Footer.css'; 

const Footer: React.FC = () => {
  return (
    <footer>
        <link href="https://fonts.googleapis.com/css2?family=Vibur&display=swap" rel="stylesheet"></link>
      <div className="footer-content">
        <div className="logo-footer">
        <img src="/favicon.png" alt="Movie Land Logo" />
          <h1>Movie Land</h1>
        </div>
        <div className="contact-info">
          <p>info@movieland.com</p>
          <p>+380683326798</p>
        </div>
        <div className="footer-columns">
          <div className="column">
            <h3>Company</h3>
            <p>About Us</p>
            <p>Location</p>
            <p>Careers</p>
          </div>
          <div className="column">
            <h3>Resources</h3>
            <p>FAQ</p>
            <p>Blog</p>
            <p>News</p>
          </div>
          <div className="column">
            <h3>Support</h3>
            <p>Refund Policy</p>
            <p>Privacy Policy</p>
            <p>Terms of Use</p>
          </div>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <p>© 2025 Movie Land. All rights reserved. Designed by Bohdan Balukh 1KI-24m</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
