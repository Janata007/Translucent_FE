import React from "react";
import HeaderLoggedIn from "../../layout/Header/HeaderLoggedIn";
import Footer from "../../layout/Footer/Footer";
import Main from "../../layout/Main/Main";
import "../page.css";
import "./Home.css";
import SearchBar from "../../components/forms/HomepageForms/SearchBar";
import UserInfo from "../../components/forms/HomepageForms/UserForms/UserInfo";
import TaskInfo from "../../components/forms/HomepageForms/UserForms/TaskInfo";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useState, useEffect } from "react";
import "./Calendar.css";
import moment from "moment";
import ArrangementService from "../../api/ArrangementService";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/ROUTES";
import { useAuth } from "../../hooks/useAuth";
import { useDebounce } from "../../hooks/useDebounce";
import DropdownMenu from "../../components/DropdownMenu";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


const localizer = momentLocalizer(moment);
const initialList=[
  {
    start:new Date('2024-10-10T11:59:11.332'),
    end: new Date("2024-10-10T11:59:11.332"),
    title: "Some title"
  }
]

const Home = () => {
  const [arrangementList, setArrangementList]=useState(initialList)
  const [calendarEventClicked, setCalendarEvent]=useState(false);
  const [id, setId] = useState(6);
  const [eventValue, setEventValue]=useState( {
    start:new Date('2024-10-10T11:59:11.332'),
    end: new Date("2024-10-10T11:59:11.332"),
    title: "Some title"
  });
  const [date, setDate] = useState(new Date());
  const [arrangements, setArrangements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();
  const [mark, setMark] = useState(["24-01-2024"]);
  const fetchData2 = async () => {
    const arrangementList = await ArrangementService.getAllArrangementsForUser(
      token,
      id
    );
    console.log(arrangementList);
    return arrangementList;
  };
  const onEventClick=(event)=>{
    console.log('event clicked!')
    setEventValue(event);
      setCalendarEvent(!calendarEventClicked);
  }
  const onCardClick=()=>{
      setCalendarEvent(false);
  }
  var popup =  <Modal   portalClassName="modal"
  open={onEventClick}
  onClose={()=>{}}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
><div onClick={()=>setCalendarEvent(false)}>
<Card>
          <CardContent>
            <Typography component="h2" variant="h5">
              {eventValue.title}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              start: {eventValue.start.toDateString()}
            </Typography>
            <Typography variant="subtitle2" div>
             end: {eventValue.end.toDateString()}
            </Typography>
            <Typography variant="subtitle2" div>
             click on card to close
            </Typography>
          </CardContent>
        </Card>
        </div>
</Modal>;

  const updateDates = (arrangements) => {
    for(var i=0; i<arrangements.length; i++){
      arrangementList.push({
        start: new Date(arrangements[i].startTime),
        end: new Date(arrangements[i].endTime),
        title: arrangements[i].name
      });
      setArrangementList(arrangementList);
    }
    console.log(arrangementList.length)
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
      <HeaderLoggedIn />
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
        {calendarEventClicked && popup}
        <div>
          <div className="calendar-container">
          <div className="home-calendar">
             <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={arrangementList}
          style={{ height: "100vh" }}
          onSelectEvent={(event)=>{onEventClick(event)}}
        /></div>
          </div>
        </div>
        <div>
        <p>
            <span className="bold">Current Date:</span> {date.toDateString()}
          </p>
          <DropdownMenu></DropdownMenu>
        </div>
      </Main>
      <Footer />
    </div>
  );
};

export default Home;
