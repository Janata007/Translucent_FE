import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/ROUTES";
import { useAuth } from "../../hooks/useAuth";
import Main from "../../layout/Main/Main";
import HeaderLoggedIn from "../../layout/Header/HeaderLoggedIn";
import Footer from "../../layout/Footer/Footer";
import FeedbackService from "../../api/FeedbackService";
import ArrangementService from "../../api/ArrangementService";
import FeedbackPost from "./FeedbackPost";
import Scroll from "react-scroll-component"
import "./FeedbackPage.css";



const FeedbackPage = () => {
  const [isLoading, setIsLoading] = useState(true); //for rerender after promise is fulfilled
  const { token } = useAuth();
  const {userInformation} = useAuth();
  const [id, setId] = useState(userInformation.id);
  let navigate = useNavigate();
  const [userFeedbacks, setUserFeedbacks] = useState([]);
  const [taskFeedbacks, setTaskFeedbacks] = useState([]);
  const [arrangementFeedbacks, setArrangementFeedbacks]= useState([]);
  const [myArrangementFeedbacks, setMyArrangementFeedbacks]= useState([]);
  const [myFeedbacks, setMyFeedbacks] = useState([]);
  const [userArrangements, setUserArrangements]= useState([]);


  const fetchData = async () => {
    await ArrangementService.getAllArrangementsForUser(token, id)
      .then((data) => {
        setUserArrangements(data);
      })
    await FeedbackService.getUserFeedback(token, id)
      .then((data) => {
        setUserFeedbacks(data);
      })
      await FeedbackService.getUserFeedbackFrom(token, id)
      .then((data) => {
        setMyFeedbacks(data);
      })
      await FeedbackService.getAllTaskFeedbacks(token)
      .then((data) => {
        setTaskFeedbacks(data);
      })
      await FeedbackService.getAllArrangementFeedbacks(token)
      .then((data) => {
        setArrangementFeedbacks(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
    // let selected = [];
    // console.log(userArrangements.length)
    // userArrangements.array.forEach(arr => {
    //   arrangementFeedbacks.array.forEach(feed => {
    //     if(feed.arrangementId==arr.id){
    //       selected.push(feed);
    //     }
    //   });
    // });
    // setMyArrangementFeedbacks(selected);
  }, [isLoading]);

  return (
    <div className="company list page">
      <HeaderLoggedIn />
      <Main>
      <div className="companyGrid">
      <label className="feedback-title">Feedbacks for me</label>
      <Scroll   direction="vertical" height={`480px`} scrollerClass={"scroller"}>
      {isLoading ? (
            <p>check</p>
          ) : (userFeedbacks.map((feedb)=>{
            return <div className="company-item"><FeedbackPost 
            grade={feedb.grade}
            percent={feedb.percent} description={feedb.description} offeredServices={[]}></FeedbackPost>
            </div>
          }))}</Scroll>
      </div>
      <div className="companyGrid">
      <label className="feedback-title">Arrangement Feedbacks</label>
      <Scroll   direction="vertical" height={`480px`} scrollerClass={"scroller"}>
      {isLoading ? (
            <p>check</p>
          ) : (arrangementFeedbacks.map((feedb)=>{
            return <div key={feedb.id}>{ (feedb.userFromId==id) && <div className="company-item"><FeedbackPost 
            grade={feedb.grade}
            percent={feedb.percent} description={feedb.description} offeredServices={[]}></FeedbackPost>
            </div>}</div>
          }))}</Scroll>
      </div>
      <div className="companyGrid">
      <label className="feedback-title">My Feedbacks</label>
      <Scroll   direction="vertical" height={`480px`} scrollerClass={"scroller"}>
      {isLoading ? (
            <p>check</p>
          ) : (myFeedbacks.map((feedb)=>{
            return <div>{ (feedb.userFromId==id) && <div className="company-item"><FeedbackPost 
            grade={feedb.grade}
            percent={feedb.percent} description={feedb.description} offeredServices={[]}></FeedbackPost>
            </div>}</div>
          }))}</Scroll>
      </div>
      <div className="companyGrid">
      <label className="feedback-title">Task feedbacks</label>
      <Scroll   direction="vertical" height={`480px`} scrollerClass={"scroller"}>
      {isLoading ? (
            <p>check</p>
          ) : (taskFeedbacks.map((feedb)=>{
            return <div className="company-item"><FeedbackPost 
            grade={feedb.grade}
            percent={feedb.percent} description={feedb.description} offeredServices={[]}></FeedbackPost>
            </div>
          }))}
          </Scroll>
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
