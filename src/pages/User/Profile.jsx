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
import SectorPost from "../Sector/SectorPost";
import { useDebounce } from "../../hooks/useDebounce";
import WorkService from "../../api/WorkService";


const Profile = () => {
    const [isLoading, setIsLoading] = useState(true); //for rerender after promise is fulfilled
    const { token } = useAuth();
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
    await UserService.getUserWithSector(id, token)
      .then((data) => {
        setUserInfo([...data]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
useEffect(() => {
    fetchData2();
    fetchData();
  }, []);

  useDebounce(
    async () => {
      try {
        const tasks = await fetchData2(token, id);
        const userStuff = await fetchData(token, id);
        setUserTasks(tasks);
        setUserInfo(userStuff);
      } catch (error) {
        console.log(error);
      }
    },
    1000,
    [isLoading]
  );

  const arrayChunk = (arr, n) => {
    const array = arr.slice();
    const chunks = [];
    while (array.length) chunks.push(array.splice(0, n));
    console.log(chunks)
    return chunks;
  };
  const finishTask = (id)=>{}

  return (
    <div className="company list page">
      <HeaderLoggedIn />
      <Main>
        <div className="companyGrid">
          {isLoading ? (
            <p>check</p>
          ) : (
            <div className="company-add">
            { <div>
      { arrayChunk(userTasks, 3).map((items, index) => {
        return (
          <div className="companyGrid">
            {items.map((task, sIndex) => {
              return <div className="company-item"> {<SectorPost
                name={task.name}
                code={task.priority}
                description={task.description}
                offeredServices={[]}
              />}<div className="buttons">
              <button
            type="button"
            className="form-button2"
            onClick={() => finishTask(task.id)}> 
            Remove
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
      </Main>
      <div className="more-buttons">
      <button
          type="button"
          className="form-button sector-button"
          onClick={() => navigate(ROUTES.CREATE_TASK)}
        >
          Create new Task
        </button>
        <div className="more-buttons"></div>
        <button
          type="button"
          className="form-button company-button"
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
