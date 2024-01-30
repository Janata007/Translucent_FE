import React from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Main from "../../layout/Main/Main";
import "../page.css";
import "./Home.css";
import SearchBar from "../../components/forms/HomepageForms/SearchBar";
import UserInfo from "../../components/forms/HomepageForms/UserForms/UserInfo";
import TaskInfo from "../../components/forms/HomepageForms/UserForms/TaskInfo";
import Calendar from "react-calendar";
import { useState } from "react";
import "./Calendar.css";
import moment from "moment";
import ArrangementService from "../../api/ArrangementService";

const Home = () => {
  const [date, setDate] = useState(new Date());
  const [arrangements, setArrangements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //todo: fetch dates with arrangements for user
  const mark = ["01-01-2024", "03-03-2024", "05-03-2024"];
  const fetchData = async () => {
    await ArrangementService.getAllArrangementsForUser(id)
      .then((data) => {
        setArrangements([...data]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="home page">
      <Header />
      <Main>
        <SearchBar></SearchBar>
        <UserInfo></UserInfo>
        <TaskInfo></TaskInfo>
        {/* <div>
          <h1 className="text-center">Calendar with Range</h1>
          <div className="calendar-container">
            <Calendar onChange={setDate} value={date} selectRange={true} />
          </div>
          {date.length > 0 ? (
            <p className="text-center">
              <span className="bold">Start:</span> {date[0].toDateString()}
              &nbsp;|&nbsp;
              <span className="bold">End:</span> {date[1].toDateString()}
            </p>
          ) : (
            <p className="text-center">
              <span className="bold">Default selected date:</span>{" "}
              {date.toDateString()}
            </p>
          )}
        </div> */}
        <div>
          <h1 className="text-center">Your Calendar</h1>
          <div className="calendar-container">
            <Calendar
              onChange={setDate}
              values={date}
              tileClassName={({ date, view }) => {
                if (mark.find((x) => x === moment(date).format("DD-MM-YYYY"))) {
                  return "highlight";
                }
              }}
            />
          </div>
          <p className="text-center">
            <span className="bold">Selected Date:</span> {date.toDateString()}
          </p>
        </div>
      </Main>
      <Footer />
    </div>
  );
};

export default Home;
