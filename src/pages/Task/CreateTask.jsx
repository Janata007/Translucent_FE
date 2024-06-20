import React from "react";
import Footer from "../../layout/Footer/Footer";
import Main from "../../layout/Main/Main";
import "../page.css";
import TaskForm from "../../components/forms/TaskForm/TaskForm";
import HeaderLoggedIn from "../../layout/Header/HeaderLoggedIn";
const CreateTask = () => {
  return (
    <div className="task creation page">
      <HeaderLoggedIn />
      <Main />
      <Main>
        <TaskForm />
      </Main>
      <Footer />
    </div>
  );
};
export default CreateTask;
