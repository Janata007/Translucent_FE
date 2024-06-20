import React from "react";
import HeaderLoggedIn from "../../../layout/Header/HeaderLoggedIn";
import Footer from "../../../layout/Footer/Footer";
import Main from "../../../layout/Main/Main";
import ArrangementFeedbackForm from "./ArrangementFeedbackForm";

const ArrangementFeedback = () => {
  return (
    <div className="arrangement creation page">
      <HeaderLoggedIn />
      <Main>
        <ArrangementFeedbackForm />
      </Main>
      <Footer />
    </div>
  );
};
export default ArrangementFeedback;
