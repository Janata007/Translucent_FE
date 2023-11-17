import React from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import "../page.css";
import "./Login.css";
import Main from "../../layout/Main/Main";
const Login = () => {
  return (
    <div className="login page">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Login;
