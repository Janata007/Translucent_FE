import React from "react";
import { FiInstagram } from "react-icons/fi";
import { CiFacebook } from "react-icons/ci";
import { BiLogoGmail } from "react-icons/bi";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-icons">
        <div className="footer-icon">
          <FiInstagram />
        </div>

        <div className="footer-icon">
          <CiFacebook />
        </div>

        <div className="footer-icon">
          <BiLogoGmail />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
