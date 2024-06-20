import React, { useEffect, useState } from "react";
import Main from "../../layout/Main/Main";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../layout/Footer/Footer";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../constants/ROUTES";
import ArrangementService from "../../api/ArrangementService";
import ArrangementPost from "./ArrangementPost";
import ProfileMainPost from "../User/ProfileMainPost";
import UserService from "../../api/UserService";
import Scroll from "react-scroll-component"
import HeaderLoggedIn from "../../layout/Header/HeaderLoggedIn";
import "../User/Profile.css"

const ArrangementPage = () => {
  const [isLoading, setIsLoading] = useState(true); //for rerender after promise is fulfilled
  const [id, setId]= useState(6)
  const { token } = useAuth();
  let navigate = useNavigate();
  const [arrangements, setArrangements] = useState([]);
  const [userInfo, setUserInfo]=useState({});
  const fetchData2= async () => {
    await UserService.getUser(id, token)
      .then((data) => {
        setUserInfo({...data});
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const fetchData = async () => {
    await ArrangementService.getAllArrangementsForUser(token, id)
      .then((data) => {
        setArrangements([...data]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);
  const arrayChunk = (arr, n) => {
    const array = arr.slice();
    const chunks = [];
    while (array.length) chunks.push(array.splice(0, n));
    return chunks;
  };

  return (
    <div className="sector list page">
      <HeaderLoggedIn />
      <Main>
      <div className="profile-info">
        {userInfo.sectorId && <ProfileMainPost profile={userInfo}></ProfileMainPost>}
      </div>
      <div className="sector-section">
      <Scroll direction="vertical"
        height={`350px`}
        width={'10px'}
        scrollerClass={"scroller"}>
        <div className="sectorGrid">
          {isLoading ? (<p>check</p>) : (
        <div className="sector-add">
        {<div>
      { arrayChunk(arrangements, 3).map((items, index) => {
        return (
          <div className="sectorGrid">
            {items.map((arrangement, sIndex) => {
              return <div className="sector-item" key={arrangement.arrangementId}> {<ArrangementPost
              id = {arrangement.arrangementId}
                name={arrangement.name}
                code={arrangement.code}
                duration={arrangement.duration}
                startTime={arrangement.startTime}
                endTime={arrangement.endTime}
                priority={arrangement.priority}
                participants={arrangement.participants}/>}
              <div className="buttons">
                <ul>
            <button type="button" className="form-button2"
            onClick={() => navigate(ROUTES.ARRANGEMENT_EDIT.replace(":id",arrangement.arrangementId))}> 
            Edit
           </button>
           <button type="button" className="form-button2"
            onClick={() => navigate(ROUTES.CREATE_ARRANGEMENT_FEEDBACK.replace(":id",arrangement.arrangementId))}> 
            Leave Feedback
           </button></ul></div>
           </div>;
            })}
           </div>);
            })}
           </div>}
        </div>
          )}
        </div>
        </Scroll></div>
      <div className="button-section">
        <button
          type="button"
          className="form-button arrangements-button"
          onClick={() => navigate(ROUTES.USER_INFO.replace(":id", id))}>
          See Tasks
        </button>
      </div>
      </Main>
      <div className="more-buttons">
      <button
          type="button"
          className="form-button"
          onClick={() => navigate(ROUTES.CREATE_ARRANGEMENT)}>
          Create new Arrangement
      </button>
        <div className="more-buttons"></div>
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
export default ArrangementPage;
