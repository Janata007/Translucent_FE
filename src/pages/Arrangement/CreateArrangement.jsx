import React from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Main from "../../layout/Main/Main";
import "../page.css";
import ArrangementForm from "../../components/forms/ArrangementForms/ArrangementForm";

const CreateArrangement = () => {
  return (
    <div className="arrangement creation page">
      <Header />
      <Main>
        <ArrangementForm />
      </Main>
      <Footer />
    </div>
  );
};
export default CreateArrangement;
