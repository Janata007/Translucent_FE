import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import { ROUTES } from "../../../../constants/ROUTES";
import { isNonEmptyString } from "../../../../util/helperFunctions";
import "../../Form.css";
import makeAnimated from "react-select/animated";
import ArrangementService from "../../../../api/ArrangementService";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const ArrangementForm = () => {
  const animatedComponents = makeAnimated();
  const { token } = useAuth();
  const [userId, setUserId] = useState(1);
  const [arrangement, setArrangement] = useState({
    name: "Meeting01",
    code: "M01",
    duration: "1.5",
    startTime: "2021-01-24T15:53:16",
    endTime: "2021-01-24T15:53:16",
  });

  const nameRef = useRef();
  const durationRef = useRef();
  const startTimeRef = useRef();
  const endTimeRef = useRef();
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
      await ArrangementService.saveNewArrangement(arrangement, userId).then(
        (response) => console.log("RESPONSE" + response)
      );
      navigate(ROUTES.HOME);
    }
  };

  return (
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

        <div className="form-group">
          <label htmlFor="duration" className="form-label">
            Duration
          </label>
          <input
            className="form-input"
            type="text"
            ref={durationRef}
            id="duration"
            onChange={(e) =>
              setArrangement({
                ...arrangement,
                [`${e.currentTarget.id}`]: e.currentTarget.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="offeredServices" className="form-label">
            Start date
          </label>
          <div className="form-group">
            <DateTimePicker label="Basic date time picker" />
          </div>
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
  );
};
export default ArrangementForm;
