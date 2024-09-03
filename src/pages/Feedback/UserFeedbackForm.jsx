import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/forms/Form.css";
import "./UserFeedbackForm.css";
import FeedbackService from "../../api/FeedbackService";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../constants/ROUTES";
import { isNonEmptyString } from "../../util/helperFunctions";
import SearchBarUsers from "../../components/forms/TaskForm/SearchBarUsers"

const UserFeedbackForm = () => {
  const { token } = useAuth();
  const {userInformation} = useAuth();
  const [description, setDescription] = useState();
  const [percent, setPercent] = useState();
  const [userId, setUserId] = useState(userInformation.id);

  const[userForId, setUserForId] = useState();
  const [grade, setGrade] = useState();
const [feedback, setFeedback] = useState();

  const descriptionRef = useRef();
  const percentRef = useRef();
  const gradeRef = useRef();
  const navigate = useNavigate();
  const noEmptyFields = () => {
    console.log(Object.values(feedback).every((v) => isNonEmptyString(v)));
    return Object.values(feedback).every((v) => isNonEmptyString(v));
  };
  const checkErrors = () => {
    if (feedback.description.length === 0) descriptionRef.current.classList.add("error");
    else descriptionRef.current.classList.remove("error");
    if (feedback.percent.length === 0) percentRef.current.classList.add("error");
    else percentRef.current.classList.remove("error");
  };
  const onCreate = async (e) => {
    e.preventDefault();
    checkErrors();
    if (noEmptyFields()) {
      await FeedbackService.createUserFeedback(token, userForId, userId, feedback).then(
        (response) => console.log("RESPONSE" + response)
      );
      navigate(ROUTES.HOME);
    }
  };
  
  return (
    <>
      <div className="form-container-user">
        <form action="POST" className="form register">
          <div className="form-group">
          <div className="search-bar">
        <label htmlFor="" className="form-label form-label2">User</label>
      <SearchBarUsers setUserForId={setUserForId}></SearchBarUsers>
      </div>
            <label htmlFor="description" className="form-label">Description</label>
            <input
              className="form-input" type="text" id="description" ref={descriptionRef}
              onChange={(e) =>
                setFeedback({
                  ...feedback,
                  [`${e.currentTarget.id}`]: e.currentTarget.value,})}/>
          </div>
          <div className="form-group">
            <label htmlFor="percent" className="form-label">Percent</label>
            <input
              className="form-input" type="text" ref={percentRef} id="percent"
              onChange={(e) =>
                setFeedback({
                  ...feedback,
                  [`${e.currentTarget.id}`]: e.currentTarget.value,})}/>
          </div>
          <div className="form-group">
            <label htmlFor="grade" className="form-label">Grade</label>
            <input
              className="form-input" type="text" ref={gradeRef} id="grade"
              onChange={(e) =>
                setFeedback({
                  ...feedback,
                  [`${e.currentTarget.id}`]: e.currentTarget.value,})}/>
          </div>
          <div className="form-actions">
            <button
              type="button" className="form-button-login"
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
    </>
  );
};
export default UserFeedbackForm;
