import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { ROUTES } from "../../../constants/ROUTES";
import CompanyService from "../../../api/CompanyService";
import { isNonEmptyString } from "../../../util/helperFunctions";
import "../Form.css";

const CompanyForm = () => {
  const { token } = useAuth();
  const [companyData, setCompanyData] = useState({
    name: "",
    description: "",
  });
  const nameRef = useRef();
  const descriptionRef = useRef();
  const navigate = useNavigate();
  const noEmptyFields = () => {
    console.log(Object.values(companyData).every((v) => isNonEmptyString(v)));
    return Object.values(companyData).every((v) => isNonEmptyString(v));
  };
  const checkErrors = () => {
    if (companyData.name.length === 0) nameRef.current.classList.add("error");
    else nameRef.current.classList.remove("error");

    if (companyData.description.length === 0)
      descriptionRef.current.classList.add("error");
    else descriptionRef.current.classList.remove("error");
  };
  const onCreate = async (e) => {
    e.preventDefault();
    checkErrors();
    if (noEmptyFields()) {
      await CompanyService.saveNewCompany(token, companyData).then((response) =>
        console.log("RESPONSE" + response)
      );
      navigate(ROUTES.ALL_COMPANIES);
    }
  };
  return (
    <div className="form-container">
      <form action="POST" className="form register">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            className="form-input" type="text" id="name" ref={nameRef}
            onChange={(e) =>
              setCompanyData({
                ...companyData,
                [`${e.currentTarget.id}`]: e.currentTarget.value,})}/>
         </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            className="form-input" type="text" ref={descriptionRef} id="description"
            onChange={(e) =>
              setCompanyData({
                ...companyData,
                [`${e.currentTarget.id}`]: e.currentTarget.value,})}/>
        </div>
        <div className="form-actions">
          <button
            type="button" className="form-button"
            onClick={(e) => onCreate(e)}>
            Create
          </button>
        </div>
        <div className="form-links">
          <div className="login-link">
            <p>Back to List {`->`}</p>
            <span onClick={() => navigate(ROUTES.ALL_COMPANIES)}></span>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CompanyForm;
