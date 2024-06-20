import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/ROUTES";
import { useAuth } from "../../hooks/useAuth";
import Main from "../../layout/Main/Main";
import HeaderLoggedIn from "../../layout/Header/HeaderLoggedIn";
import Footer from "../../layout/Footer/Footer";
import FeedbackService from "../../api/FeedbackService";
import SectorPost from "../Sector/SectorPost";
import FeedbackPost from "./FeedbackPost";


const FeedbackPage = () => {
  const [isLoading, setIsLoading] = useState(true); //for rerender after promise is fulfilled
  const { token } = useAuth();
  const [id, setId]=useState(6)
  let navigate = useNavigate();
  const [userFeedbacks, setUserFeedbacks] = useState([]);
  const [taskFeedbacks, setTaskFeedbacks] = useState([]);


  const fetchData = async () => {
    await FeedbackService.getUserFeedback(token, id)
      .then((data) => {
        setUserFeedbacks(data);
      })
      await FeedbackService.getAllTaskFeedbacks(token)
      .then((data) => {
        setTaskFeedbacks(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className="company list page">
      <HeaderLoggedIn />
      <Main>
      <div className="companyGrid">
      {isLoading ? (
            <p>check</p>
          ) : (userFeedbacks.map((feedb)=>{
            return <div className="company-item"><FeedbackPost 
            grade={feedb.grade}
            percent={feedb.percent} description={feedb.description} offeredServices={[]}></FeedbackPost>
            </div>
          }))}
      </div>
      <div className="companyGrid">
      {isLoading ? (
            <p>check</p>
          ) : (taskFeedbacks.map((feedb)=>{
            return <div className="company-item"><FeedbackPost 
            grade={feedb.grade}
            percent={feedb.percent} description={feedb.description} offeredServices={[]}></FeedbackPost>
            </div>
          }))}
      </div>
      </Main>
      <div className="more-buttons">
      <button
          type="button"
          className="form-button"
          onClick={() => navigate(ROUTES.CREATE_USER_FEEDBACK)}>
          Create User Feedback
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
export default FeedbackPage;
