import React from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Main from "../../layout/Main/Main";
import "../page.css";
import CompanyForm from "../../components/forms/CompanyForm/CompanyForm";

const CreateCompany = () => {
  return (
    <div className="company creation page">
      <Header />
      <Main />
      <Main>
        <CompanyForm />
      </Main>
      <Footer />
    </div>
  );
};
export default CreateCompany;
