import React from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Main from "../../layout/Main/Main";
import "../page.css";
import ArrangementForm from "../../components/forms/HomepageForms/ArrangementForms/ArrangementForm";

const CreateArrangement = () => {
  return (
    <div className="arrangement creation page">
      <Header />
      <Main />
      <Main>
        <ArrangementForm />
      </Main>
      <Footer />
    </div>
  );
};
export default CreateArrangement;
