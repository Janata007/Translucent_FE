import React from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Main from "../../layout/Main/Main";
import "../page.css";
import TaskForm from "../../components/forms/TaskForm/TaskForm";
const CreateTask = () => {
  return (
    <div className="task creation page">
      <Header />
      <Main />
      <Main>
        <TaskForm />
      </Main>
      <Footer />
    </div>
  );
};
export default CreateTask;
