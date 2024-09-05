import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { ROUTES } from "../../../constants/ROUTES";
import "../Form.css";
import "../../../pages/Home/Home.css";
import SearchBarUsers from "../TaskForm/SearchBarUsers";
import ArrangementService from "../../../api/ArrangementService";

const EditArrangementForm = ({currentArrangement}) => {
  const [isLoading, setIsLoading] = useState(true); //for rerender after promise is fulfilled
  const { token } = useAuth();
  const {userInformation} = useAuth();
  const [id, setId]= useState(userInformation.id)

  const [arrangementId, setArrangementId]= useState(8)
  const [participantId, setParticipantId]=useState(0)
  const dateDueRef = useRef();
  const navigate = useNavigate();
  const [arrangement, setArrangement] = useState(currentArrangement)
 
  const onCreate = async () => {
  };
  //todo: fix 403 problem here
  const addParticipantToArrangement = async () =>{
        await ArrangementService.addParticipantToArrangement(token ,participantId,  id)
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
          <ul>
          <form action="POST" className="form register">
          <div className="form-group">
      <div className="form-actions">
          <button
            type="button" className="form-button-login button-edit"
            onClick={() => addParticipantToArrangement()}>
            Add as Participant
          </button>
      </div>
        <div className="form-actions">
          <button
            type="button" className="form-button-login"
            onClick={(e) => removeParticipantFromArrangement(e)}>
            Remove Participant
          </button>
        </div>
        </div>
        <div className="form-actions">
        </div>
        <div className="form-links">
          <div className="login-link">
            <p>Back to Arrangements {`->`}</p>
            <span onClick={() => navigate(ROUTES.ARRANGEMENTS.replace(":id", id))}></span>
          </div>
        </div>
      </form>
      <div className="search-bar">
      <label htmlFor="" className="form-label form-label2">
        Participant</label>
          <SearchBarUsers setUserForId={setParticipantId}></SearchBarUsers>
          </div>
          </ul>
      </div>
  );
};
export default EditArrangementForm;
