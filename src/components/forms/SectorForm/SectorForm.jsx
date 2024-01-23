import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { ROUTES } from "../../../constants/ROUTES";
import SectorService from "../../../api/SectorService";
import { isNonEmptyString } from "../../../util/helperFunctions";
import "./Form.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const SectorForm = () => {
  const animatedComponents = makeAnimated();
  const { login } = useAuth();
  const [sectorData, setSectorData] = useState({
    name: "",
    code: "",
    description: "",
    offeredServices: [],
  });

  const options = [
    { value: "MARKETING", label: "Marketing" },
    { value: "SOFTWARE_DEVELOPMENT", label: "Software Development" },
    { value: "MANAGEMENT", label: "Management" },
    { value: "MARKETING", label: "Marketing" },
    { value: "UI_DESIGN", label: "UI Design" },
    { value: "DESIGN", label: "Design" },
    { value: "HR", label: "Human Resourcing" },
    { value: "EVENT", label: "Event management" },
    { value: "ORGANIZATION", label: "Organization" },
    { value: "TRANSCRIPTION", label: "Transcription" },
  ];
  const nameRef = useRef();
  const descriptionRef = useRef();
  const offeredServicesRef = useRef();
  const codeRef = useRef();
  const navigate = useNavigate();
  const noEmptyFields = () => {
    console.log(Object.values(sectorData).every((v) => isNonEmptyString(v)));
    return Object.values(sectorData).every((v) => isNonEmptyString(v));
  };

  const checkErrors = () => {
    if (sectorData.name.length === 0) nameRef.current.classList.add("error");
    else nameRef.current.classList.remove("error");

    if (sectorData.code.length === 0) codeRef.current.classList.add("error");
    else codeRef.current.classList.remove("error");
  };

  const onCreate = async (e) => {
    e.preventDefault();
    checkErrors();
    if (noEmptyFields()) {
      await SectorService.saveSector(sectorData).then((response) =>
        console.log(response)
      );
      navigate(ROUTES.COMPANY);
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
              setSectorData({
                ...sectorData,
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
              setSectorData({
                ...sectorData,
                [`${e.currentTarget.id}`]: e.currentTarget.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            className="form-input"
            type="text"
            ref={descriptionRef}
            id="description"
            onChange={(e) =>
              setSectorData({
                ...sectorData,
                [`${e.currentTarget.id}`]: e.currentTarget.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="offeredServices" className="form-label">
            Offered Services
          </label>

          <div className="form-group">
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              defaultValue={[]}
              isMulti
              options={options}
            />
          </div>
          <input
            className="form-input"
            type="text"
            ref={offeredServicesRef}
            id="offeredServices"
            onChange={(e) =>
              setSectorData({
                ...sectorData,
                [`${e.currentTarget.id}`]: e.currentTarget.value,
              })
            }
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
  );
};
export default SectorForm;
