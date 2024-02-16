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
import { useState, useEffect } from "react";
import "./Calendar.css";
import moment from "moment";
import ArrangementService from "../../api/ArrangementService";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/ROUTES";
import { useAuth } from "../../hooks/useAuth";
import { useDebounce } from "../../hooks/useDebounce";
import DropdownMenu from "../../components/DropdownMenu";

const Home = () => {
  const [id, setId] = useState(12);
  const [date, setDate] = useState(new Date());
  const [arrangements, setArrangements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  //todo: set dates from arrangements for user
  const [mark, setMark] = useState(["24-01-2024"]);
  const fetchData2 = async () => {
    const arrangementList = await ArrangementService.getAllArrangementsForUser(
      token,
      id
    );
    return arrangementList;
  };

  const updateDates = (arrangements) => {
    arrangements.map((arrangement) => {
      setMark((previous) => [
        ...previous,
        arrangement.startTime.substring(8, 10) +
          "-" +
          arrangement.startTime.substring(5, 8) +
          arrangement.startTime.substring(0, 4),
      ]);
    });
  };

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useDebounce(
    async () => {
      try {
        const arrangs = await fetchData2(token, id);
        setArrangements(arrangs);
        updateDates(arrangs);
        console.log("ARRANGEMENTS START TIME: " + arrangs[0].startTime);
        console.log("MARK " + mark);
      } catch (error) {
        console.log(error);
      }
    },
    1000,
    [isLoading]
  );

  return (
    <div className="home page">
      <Header />
      <Main>
        <SearchBar></SearchBar>
        {/* <UserInfo></UserInfo> */}
        {/* <TaskInfo></TaskInfo> */}
        <button
          type="button"
          className="form-button2"
          onClick={() => navigate(ROUTES.CREATE_ARRANGEMENT)}
        >
          Create an Arrangement
        </button>
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
        <div>
          <DropdownMenu></DropdownMenu>
        </div>
      </Main>
      <Footer />
    </div>
  );
};

export default Home;
