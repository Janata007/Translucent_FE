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
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import WorkService from "../../api/WorkService";
const localizer = momentLocalizer(moment);
const initialList=[
  {
    start:new Date('2024-10-10T11:59:11.332'),
    end: new Date("2024-10-10T11:59:11.332"),
    title: "Arrangement X"
  }
]
const initialTaskList=[
  {
    start:new Date('2024-08-10T11:59:11.332'),
    end: new Date("2024-10-10T11:59:11.332"),
    title: "Task X"
  }
]

const Home = () => {
  const [arrangementList, setArrangementList]=useState(initialList);
  const [taskList, setTaskList]=useState(initialTaskList);
  const [tasksToPass, setTasksToPass]= useState([{}]);
  const [eventList, setEventList] = useState(initialList);
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
  const fetchData2 = async () => {
    const arrangementList = await ArrangementService.getAllArrangementsForUser(
      token,
      id
    );
    return arrangementList;
  };
  const fetchData = async () => {
    const taskList = await WorkService.getTasksForUser(
      token,
      id
    );
    return taskList;
  };
  const onEventClick=(event)=>{
    setEventValue(event);
      setCalendarEvent(!calendarEventClicked);
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

  const updateDates = (arrangements, tasks) => {
    for(var i=0; i<arrangements.length; i++){
      eventList.push({
        start: new Date(arrangements[i].startTime),
        end: new Date(arrangements[i].endTime),
        title: arrangements[i].name
      });
      setEventList(eventList);
    }
    for(var i=0; i<tasks.length; i++){
      eventList.push({
        start: new Date(tasks[i].dateCreated),
        end: new Date(tasks[i].dateDue),
        title: tasks[i].name
      });
      setEventList(eventList);
    }
    console.log(arrangementList.length)
  };

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useDebounce(
    async () => {
      try {
        const arrangs = await fetchData2(token, id);
        const tasks = await fetchData(token, id);
        setArrangements(arrangs);
        setTaskList(tasks);
        setTasksToPass(tasks);
        updateDates(arrangs, tasks);
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
        <div className="first-section">
          <div className="section-one-space"> 
        <SearchBar></SearchBar>
        </div>
        <ul><UserInfo></UserInfo>
        <button
          type="button"
          className="form-button-arrangement"
          onClick={() => navigate(ROUTES.CREATE_ARRANGEMENT)}
        >
          Create an Arrangement
        </button>
        </ul>
        </div>
        {calendarEventClicked && popup}
        <div>
          <div className="calendar-container">
          <div className="home-calendar">
             <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={eventList}
          style={{ height: "100vh" }}
          onSelectEvent={(event)=>{onEventClick(event)}}
        /></div>
          </div>
        </div>
        <div className="third-section">
        <p>
            <span className="bold">Current Date:</span> {date.toDateString()}
          </p>
          <div className ="task-info">
          <TaskInfo taskList={tasksToPass}></TaskInfo>
          </div>
        </div>
        <button
          type="button"
          className="form-button-tasks"
          //todo: fix id nav
          onClick={() => navigate(ROUTES.USER_INFO.replace(":id", id))}
        >
          All tasks
        </button>
        <button
          type="button"
          className="form-button-companies"
          onClick={() => navigate(ROUTES.ALL_COMPANIES)}>
          Companies
        </button>
      </Main>
      <Footer />
    </div>
  );
};

export default Home;
