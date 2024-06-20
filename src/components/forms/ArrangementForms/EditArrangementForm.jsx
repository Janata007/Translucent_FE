import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { ROUTES } from "../../../constants/ROUTES";
import "../Form.css";
import SearchBarUsers from "../TaskForm/SearchBarUsers";
import ArrangementService from "../../../api/ArrangementService";

const EditArrangementForm = ({currentArrangement}) => {
  const [isLoading, setIsLoading] = useState(true); //for rerender after promise is fulfilled
  const { token } = useAuth();
  const [id, setId]= useState(6)
  const [arrangementId, setArrangementId]= useState(8)
  const [participantId, setParticipantId]=useState(6)
  const dateDueRef = useRef();
  const navigate = useNavigate();
  const [arrangement, setArrangement] = useState(currentArrangement)
 
  const onCreate = async () => {
  };
  //todo: fix cross origin problem here
  const addParticipantToArrangement = async () =>{
        await ArrangementService.addParticipantToArrangement(token,participantId,  arrangementId)
        .then((data) => {
          setArrangement(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
      }
      const removeParticipantFromArrangement = async () =>{
        await ArrangementService.removeParticipantFromArrangement(token, arrangementId, participantId)
        .then((data) => {
          setArrangement(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
      }
  return (
    <div className="form-container">
      <form action="POST" className="form register">
        <div className="form-group">
        <div className="search-bar">
        <label htmlFor="" className="form-label form-label2">
            Participant</label>
      <SearchBarUsers setUserForId={setParticipantId}></SearchBarUsers>
      </div>
      <div className="form-actions">
          <button
            type="button" className="form-button"
            onClick={() => addParticipantToArrangement()}>
            Add as Participant
          </button>
      </div>
        <div className="form-actions">
          <button
            type="button" className="form-button"
            onClick={(e) => removeParticipantFromArrangement(e)}>
            Remove as Participant
          </button>
        </div>
        </div>
        <div className="form-actions">
          <button
            type="button" className="form-button"
            onClick={(e) => onCreate(e)}>
            Edit
          </button>
        </div>
        <div className="form-links">
          <div className="login-link">
            <p>Back to Arrangements {`->`}</p>
            <span onClick={() => navigate(ROUTES.ARRANGEMENTS.replace(":id", arrangementId))}></span>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EditArrangementForm;
