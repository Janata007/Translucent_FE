import React from "react";
import logo from "../../assets/icon-white.png";
import logoText from "../../assets/logo_text_white.png";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        <img src={logo} className="nav-icon" alt="logo"></img>
        <div src={logoText} className="nav-logo"></div>
        <ul className="nav-menu">
          <li className="nav-menu_item">About</li>
          <li className="nav-menu_item">Contact</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
