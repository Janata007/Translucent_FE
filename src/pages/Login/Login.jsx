import React from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import "../page.css";
import "./Login.css";
import Main from "../../layout/Main/Main";
import LoginForm from "../../components/forms/LoginForm/LoginForm";
const Login = () => {
  return (
    <div className="login page">
      <Header />
      <Main>
        <LoginForm />
      </Main>
      <Footer />
    </div>
  );
};

export default Login;
