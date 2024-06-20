import React from "react";
import Footer from "../../layout/Footer/Footer";
import Main from "../../layout/Main/Main";
import "../page.css";
import ArrangementForm from "../../components/forms/ArrangementForms/ArrangementForm";
import HeaderLoggedIn from "../../layout/Header/HeaderLoggedIn";

const CreateArrangement = () => {
  return (
    <div className="arrangement creation page">
      <HeaderLoggedIn />
      <Main>
        <ArrangementForm />
      </Main>
      <Footer />
    </div>
  );
};
export default CreateArrangement;
