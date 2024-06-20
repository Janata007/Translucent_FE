import React from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Main from "../../layout/Main/Main";
import "../page.css";
import UserFeedbackForm from "./UserFeedbackForm";

const CreateUserFeedback = () => {
  return (
    <div className="arrangement creation page">
      <Header />
      <Main>
        <UserFeedbackForm />
      </Main>
      <Footer />
    </div>
  );
};
export default CreateUserFeedback;
