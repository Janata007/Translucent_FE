import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { ROUTES } from "../../../constants/ROUTES";
import { isNonEmptyString } from "../../../util/helperFunctions";
import "./TaskForm.css";
import "../Form.css";
import WorkService from "../../../api/WorkService";
import SearchBarUsers from "./SearchBarUsers";

const TaskForm = () => {
  const { login, token } = useAuth();
  const {userInformation} = useAuth();
  const [taskData, setTaskData] = useState({
    name: "",
    priority: "MEDIUM",
    description: "",
    arrangementId: 0,
    dateDue: "",
    finished: false,
    accepted: false,
  });
  const [taskInfo, setTaskInfo]=useState({ userForId:0})
  const setUserForId=(userId)=>{
    console.log(userId)
    setTaskInfo({userForId:userId})
  }
  const nameRef = useRef();
  const priorityRef = useRef();
  const descriptionRef = useRef();
  const dateDueRef = useRef();
  const navigate = useNavigate();
  const noEmptyFields = () => {
    console.log(Object.values(taskData).every((v) => isNonEmptyString(v)));
    return Object.values(taskData).every((v) => isNonEmptyString(v));
  };
  const checkErrors = () => {
    if (taskData.name.length === 0) nameRef.current.classList.add("error");
    else nameRef.current.classList.remove("error");
  };
  const onCreate = async (e) => {
    console.log("NEW TASK " + taskData.dateDue)
    e.preventDefault();
    checkErrors();
    // if (noEmptyFields()) {
      await WorkService.saveTask(token, taskData, userInformation.id, taskInfo.userForId).then((response) =>
        console.log(response)
      );
      navigate(ROUTES.HOME);
  };
  return (
    <div className="form-container">
      <form action="POST" className="form register">
        <div className="form-group">
      <div className="search-bar">
        <label htmlFor="" className="form-label form-label2">Assignee</label>
      <SearchBarUsers setUserForId={setUserForId}></SearchBarUsers>
      </div>
          <label htmlFor="name" className="form-label">Name</label>
          <input
            className="form-input" type="text" id="name" ref={nameRef}
            onChange={(e) =>
              setTaskData({
                ...taskData,
                [`${e.currentTarget.id}`]: e.currentTarget.value,})}/>
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            className="form-input" type="text" ref={descriptionRef} id="description"
            onChange={(e) =>
              setTaskData({
                ...taskData,
                [`${e.currentTarget.id}`]: e.currentTarget.value,})}/>
        </div>
        <div className="form-group">
          <label htmlFor="dateDue" className="form-label">Date Due</label>
          <input
            className="form-input" type="date" ref={dateDueRef} id="dateDue"
            onChange={(e) =>
              setTaskData({
                ...taskData,
                [`${e.currentTarget.id}`]: e.currentTarget.value.concat("T11:59:11.332"),})}/>
        </div>
        <div className="form-actions">
          <button
            type="button"
            className="form-button-login"
            onClick={(e) => onCreate(e)}>
            Create
          </button>
        </div>
        <div className="form-links">
          <div className="login-link">
            <p>Back to Home {`->`}</p>
            <span onClick={() => navigate(ROUTES.HOME)}></span>
          </div>
        </div>
      </form>
    </div>
  );
};
export default TaskForm;
