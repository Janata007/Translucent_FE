import UserService from "../../api/UserService";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import HeaderLoggedIn from "../../layout/Header/HeaderLoggedIn";
import Footer from "../../layout/Footer/Footer";
import Main from "../../layout/Main/Main";
import { ROUTES } from "../../constants/ROUTES";
import WorkService from "../../api/WorkService";
import ProfileMainPost from "./ProfileMainPost";
import TaskPost from "../Task/TaskPost";
import Scroll from "react-scroll-component"
import "./Profile.css";

const Profile = () => {
  const {loggedInUserInfo} = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useAuth();
    //todo: diff way to get id
  const [id, setId]= useState(window.location.href.substring(45))
  let navigate = useNavigate();
  const [userTasks, setUserTasks] = useState([]);
  const [userInfo, setUserInfo]=useState({});

  const fetchData = async () => {
    await UserService.getUser(id, token)
      .then((data) => {
        setUserInfo(data);
      })
      await WorkService.getTasksForUser(token, id)
      .then((data) => {
        setUserTasks([...data]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  
  const toggleWorkStatus = async ()=>{
    await UserService.setWorkVisibleForUser(id, !userInfo.workVisible, token)
      .then((data) => {
        setUserInfo(data);
      })
      window.location.reload();
  }
useEffect(() => {
  fetchData();
  }, []);
  const arrayChunk = (arr, n) => {
    const chunks = [];
    if(arr.length!=0){
    const array = arr.slice();
    while (array.length) chunks.push(array.splice(0, n));
    }
    return chunks;
  };

  return (
    <div className="company list page">
      <HeaderLoggedIn />
      <Main>
      <div className="profile-info">
      {userInfo.workVisible && <div>Your work is visible to others !</div>}
      {userInfo.sectorId &&
        <ProfileMainPost profile={userInfo}></ProfileMainPost>}
      </div>
      <div className="task-section">
      <Scroll   direction="vertical"
        height={`320px`}
        width={'10px'}
        scrollerClass={"scroller"}>
        <div className="taskGrid">
          {isLoading ? (
            <p>check</p>
          ) : (
            <div className="company-add">
            { <div className="tasks">
        {arrayChunk(userTasks, 3).map((items, index) => {
        return (
          <div className="taskGrid">
            {items.map((task, sIndex) => {
              return <div className="company-item"> {<TaskPost
              userId={id}
              id={task.id}
                name={task.name}
                priority={task.priority}
                description={task.description}
                finished= {task.finished} 
                accepted={task.accepted} dateDue ={task.dateDue}
              />}<div className="buttons">
           </div></div>;})}
           </div>);})}
           </div>}
           </div>
        )}
        </div>
        </Scroll>
      </div>
      <div className="button-section1">
        <button
          type="button"
          className="form-button arrangements-button"
          onClick={() => navigate(ROUTES.ARRANGEMENTS.replace(":id", id))}>
          See Arrangements
        </button>
        {id==loggedInUserInfo.userId &&
        <button
          type="button"
          className="form-button-work form-button arrangements-button"
          onClick={toggleWorkStatus}>
          Toggle work visibility
        </button>}
        </div>
      </Main>
      <div className="more-buttons">
      <button
          type="button"
          className="form-button"
          onClick={() => navigate(ROUTES.CREATE_TASK)}>
          Create new Task
      </button>
        <button
          type="button"
          className="form-button"
          onClick={() => navigate(ROUTES.HOME)}>
          Return to Home
       </button>
     </div>
      <Footer />
    </div>
  );
};

export default Profile;
