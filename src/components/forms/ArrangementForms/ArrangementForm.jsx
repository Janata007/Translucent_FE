import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { ROUTES } from "../../../constants/ROUTES";
import { isNonEmptyString } from "../../../util/helperFunctions";
import "../../forms/Form.css";
// import "./ArrangementForm.css";
import "react-date-picker/dist/DatePicker.css";
import ArrangementService from "../../../api/ArrangementService";
import DatePicker from "react-datepicker";
import "react-time-picker/dist/TimePicker.css";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";

const ArrangementForm = () => {
  const { token } = useAuth();
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [userId, setUserId] = useState(6);
  const [arrangement, setArrangement] = useState({
    name: "Meeting01",
    code: "M01",
    duration: "1.5",
    startTime: "2021-01-24T15:53:16",
    endTime: "2021-01-24T15:53:16",
  });

  const nameRef = useRef();
  const durationRef = useRef();
  const codeRef = useRef();
  const navigate = useNavigate();
  const noEmptyFields = () => {
    console.log(Object.values(arrangement).every((v) => isNonEmptyString(v)));
    return Object.values(arrangement).every((v) => isNonEmptyString(v));
  };

  const checkErrors = () => {
    if (arrangement.name.length === 0) nameRef.current.classList.add("error");
    else nameRef.current.classList.remove("error");

    if (arrangement.code.length === 0) codeRef.current.classList.add("error");
    else codeRef.current.classList.remove("error");
  };

  const onCreate = async (e) => {
    e.preventDefault();
    checkErrors();
    if (noEmptyFields()) {
      console.log(arrangement);
      await ArrangementService.saveNewArrangement(arrangement, userId, token).then(
        (response) => console.log("RESPONSE" + response)
      );
      navigate(ROUTES.HOME);
    }
  };

  return (
    <>
      <div className="form-container">
        <form action="POST" className="form register">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              className="form-input"
              type="text"
              id="name"
              ref={nameRef}
              onChange={(e) =>
                setArrangement({
                  ...arrangement,
                  [`${e.currentTarget.id}`]: e.currentTarget.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="code" className="form-label">
              Code
            </label>
            <input
              className="form-input"
              type="text"
              ref={codeRef}
              id="code"
              onChange={(e) =>
                setArrangement({
                  ...arrangement,
                  [`${e.currentTarget.id}`]: e.currentTarget.value,
                })
              }
            />
          </div>
          <div className="date-form">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <div className="datePicker">
            <DatePicker
              selected={date}
              onChange={(newDate) => setDate(newDate)}
              minDate={new Date()}
              className="date-selection__input"
              autoFocus
              tabIndex={0}
            /></div>
          </div>
          <div className="form-group">
            <label htmlFor="date" className="form-label">
              Start Time
            </label>
            <TimePicker
              disableClock={true}
              hourPlaceholder="HH"
              minutePlaceholder="mm"
              maxDetail="minute"
              className={"input-time"}
              clearIcon={null}
              value={startTime}
              onChange={(newTime) => setStartTime(newTime)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date" className="form-label">
              End Time
            </label>
            <TimePicker
              disableClock={true}
              hourPlaceholder="HH"
              minutePlaceholder="mm"
              maxDetail="minute"
              className={"input-time"}
              clearIcon={null}
              value={endTime}
              onChange={(newTime) => setEndTime(newTime)}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="form-button"
              onClick={(e) => onCreate(e)}
            >
              Create
            </button>
          </div>

          <div className="form-links">
            <div className="login-link">
              <p>Back to Company {`->`}</p>
              <span onClick={() => navigate(ROUTES.COMPANY)}></span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default ArrangementForm;
