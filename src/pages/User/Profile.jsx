import { useParams } from "react-router-dom";
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


const Profile = () => {
    const [isLoading, setIsLoading] = useState(true); //for rerender after promise is fulfilled
    const { token } = useAuth();
    //todo: get id from params
  const [id, setId]= useState(6)
  let navigate = useNavigate();
  const [userTasks, setUserTasks] = useState([]);
  const [userInfo, setUserInfo]=useState({});
  
  const fetchData2 = async () => {
    await WorkService.getTasksForUser(token, id)
      .then((data) => {
        setUserTasks([...data]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const fetchData = async () => {
    await UserService.getUser(id, token)
      .then((data) => {
        setUserInfo({...data});
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
useEffect(() => {
    fetchData2();
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
  const finishTask = (id)=>{}

  return (
    <div className="company list page">
      <HeaderLoggedIn />
      <Main>
      <div className="profile-info">
        <ProfileMainPost profile={userInfo}></ProfileMainPost>
      </div>
      <div className="task-section">
      <Scroll   direction="vertical"
        height={`350px`}
        width={'10px'}
        scrollerClass={"scroller"}>
        <div className="companyGrid">
          {isLoading ? (
            <p>check</p>
          ) : (
            <div className="company-add">
            { <div className="tasks">
      { arrayChunk(userTasks, 3).map((items, index) => {
        return (
          <div className="companyGrid taskGrid">
            {items.map((task, sIndex) => {
              return <div className="company-item"> {<TaskPost
                name={task.name}
                priority={task.priority}
                description={task.description}
                finished= {task.finished} 
                accepted={task.accepted} dateDue ={task.dateDue}
              />}<div className="buttons">
              <button
            type="button"
            className="form-button2"
            onClick={() => finishTask(task.id)}> 
            Mark as finished
           </button>
           </div>
           </div>;
            })}
           </div>
            );
            })}
           </div>}
            </div>
          )}
        </div>
        </Scroll>
        </div>
        <button
          type="button"
          className="form-button arrangements-button"
          onClick={() => navigate(ROUTES.ARRANGEMENTS.replace(":id", id))}
        >
          See Arrangements
        </button>
      </Main>
      <div className="more-buttons">
      <button
          type="button"
          className="form-button"
          onClick={() => navigate(ROUTES.CREATE_TASK)}
        >
          Create new Task
        </button>
        <div className="more-buttons"></div>
        <button
          type="button"
          className="form-button"
          onClick={() => navigate(ROUTES.HOME)}
        >
          Return to Home
        </button>
        </div>
      <Footer />
    </div>
  );
};

export default Profile;
