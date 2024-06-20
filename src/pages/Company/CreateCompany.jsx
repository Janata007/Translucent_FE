import React from "react";
import Footer from "../../layout/Footer/Footer";
import Main from "../../layout/Main/Main";
import "../page.css";
import CompanyForm from "../../components/forms/CompanyForm/CompanyForm";
import HeaderLoggedIn from "../../layout/Header/HeaderLoggedIn";

const CreateCompany = () => {
  return (
    <div className="company creation page">
      <HeaderLoggedIn />
      <Main />
      <Main>
        <CompanyForm />
      </Main>
      <Footer />
    </div>
  );
};
export default CreateCompany;
