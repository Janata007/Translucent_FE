import React from "react";
import Footer from "../../layout/Footer/Footer";
import Main from "../../layout/Main/Main";
import "../page.css";
import UserFeedbackForm from "./UserFeedbackForm";
import HeaderLoggedIn from "../../layout/Header/HeaderLoggedIn";

const CreateUserFeedback = () => {
  return (
    <div className="arrangement creation page">
      <HeaderLoggedIn />
      <Main>
        <UserFeedbackForm />
      </Main>
      <Footer />
    </div>
  );
};
export default CreateUserFeedback;
