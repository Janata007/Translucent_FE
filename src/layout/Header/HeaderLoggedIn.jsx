import React from "react";
import logo from "../../assets/icon-white.png";
import logoText from "../../assets/logo_text_white.png";
import "./Header.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const HeaderLoggedIn = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        <img src={logo} className="nav-icon" alt="logo"></img>
        <div src={logoText} className="nav-logo"></div>
        <ul className="nav-menu">
          <li className="nav-menu_item"><button>About</button></li>
          <li className="nav-menu_item"><button>Contact</button></li>
          <li className="nav-menu_item"><button>Log Out</button></li>
          <Popup class= "popup" trigger={<button> Trigger</button>} position="left">
    <div>Popup content here !!</div>
  </Popup>
        </ul>
      </nav> 
    </header>
  );
};

export default HeaderLoggedIn;
