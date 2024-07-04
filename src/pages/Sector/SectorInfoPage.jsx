import UserService from "../../api/UserService";
import { useAuth } from "../../hooks/useAuth";
import "../User/Profile.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import HeaderLoggedIn from "../../layout/Header/HeaderLoggedIn";
import Footer from "../../layout/Footer/Footer";
import Main from "../../layout/Main/Main";
import { ROUTES } from "../../constants/ROUTES";
import Scroll from "react-scroll-component"
import ProfileMainPost from "../User/ProfileMainPost";
import UserPost from "../User/UserPost";


const SectorInfoPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useAuth();
    const {loggedInUserInfo} = useAuth();
  const [id, setId]= useState(loggedInUserInfo.userId)
  let navigate = useNavigate();
  const [sectorMemebers, setSectorMembers] = useState([]);
  const [userInfo, setUserInfo]=useState({});
  const [sectorId, setSectorId] = useState(14)
  const fetchData = async () => {
    await UserService.getUser(id, token)
      .then((data) => {
        setUserInfo(data);
      })
      await UserService.getAllUsersInSector(sectorId, token)
      .then((data) => {
        setSectorMembers([...data]);
      })
      .finally(() => {
        setIsLoading(false);
      });};
      
  useEffect(() => {
  fetchData();}, []);

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
      <div>Members</div>
      {userInfo.sectorId &&
        <ProfileMainPost profile={userInfo}></ProfileMainPost>}
      </div>
      <div className="task-section">
      <Scroll   direction="vertical"
        height={`350px`}
        width={'10px'}
        scrollerClass={"scroller"}>
        <div className="taskGrid">
          {isLoading ? (
            <p>check</p>
          ) : (
            <div className="company-add">
            { <div className="tasks">
      { arrayChunk(sectorMemebers, 3).map((items, index) => {
        return (
          <div className="taskGrid">
            {items.map((member, sIndex) => {
              return <div className="company-item"> {<UserPost
                id={member.userId} 
                firstName={member.firstName}
                 lastName={member.lastName} 
                 userName= {member.username} email={member.email}
              />}<div className="buttons">
           </div>
           <div className="buttons">
          <button
            type="button"
            className="form-button2"
            onClick={() => navigate(ROUTES.USER_INFO.replace(":id", member.userId))}> 
            Contact
          </button>
           </div></div>;})}
          </div>);
            })}</div>}
            </div>)}
        </div>
        </Scroll>
     </div>
      </Main>
      <div className="more-buttons">
      <button
          type="button"
          className="form-button"
          onClick={() => navigate(ROUTES.USER_INFO.replace(":id", id))}>
          My Profile
      </button>
        <div className="more-buttons"></div>
        <button
          type="button"
          className="form-button"
          onClick={() => navigate(ROUTES.HOME)}>
          Home
        </button>
      </div>
      <Footer />
    </div>
  );
};
export default SectorInfoPage;
