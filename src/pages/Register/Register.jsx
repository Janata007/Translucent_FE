import React from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Main from "../../layout/Main/Main";
import "../page.css";
import "./Register.css";
import RegisterForm from "../../components/forms/RegisterForm/RegisterForm";

const Register = () => {
  return (
    <div className="register page">
      <Header />
      <Main />
      <Main>
        <div class="form-container">
            <RegisterForm />
      </div>
      </Main>
      <Footer />
    </div>
  );
};
export default Register;
