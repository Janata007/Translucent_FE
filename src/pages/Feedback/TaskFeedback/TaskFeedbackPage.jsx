import React from "react";
import TaskFeedbackForm from "./TaskFeedbackForm";
import HeaderLoggedIn from "../../../layout/Header/HeaderLoggedIn";
import Footer from "../../../layout/Footer/Footer";
import Main from "../../../layout/Main/Main";

const TaskFeedbackPage = () => {
  return (
    <div className="arrangement creation page">
      <HeaderLoggedIn />
      <Main>
        <TaskFeedbackForm />
      </Main>
      <Footer />
    </div>
  );
};
export default TaskFeedbackPage;
