import React from "react";
import logo from "../../assets/icon-white.png";
import logoText from "../../assets/logo_text_white.png";
import "./Header.css";
import 'reactjs-popup/dist/index.css';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/ROUTES";
import { useAuth } from "../../hooks/useAuth";


const HeaderLoggedIn = () => {
  let navigate = useNavigate();
  const {logout} = useAuth();
  return (
    <header className="header">
      <nav className="header-nav">
        <img src={logo} className="nav-icon" alt="logo"></img>
        <div src={logoText} className="nav-logo"></div>
        <ul className="nav-menu">
          <li className="nav-menu_item"><button className="nav-button" onClick={()=>{navigate(ROUTES.ABOUT)}}>About</button></li>
          <li className="nav-menu_item"><button className="nav-button" onClick={()=>{navigate(ROUTES.ABOUT)}}>Contact</button></li>
          <li className="nav-menu_item"><button className="nav-button" onClick={()=>{
            logout();
            navigate(ROUTES.LOGIN)}}>Log Out</button></li>
        </ul>
      </nav> 
    </header>
  );
};
export default HeaderLoggedIn;
