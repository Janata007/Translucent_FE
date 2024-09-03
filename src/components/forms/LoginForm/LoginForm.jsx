import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import UserService from "../../../api/UserService";
import { useAuth } from "../../../hooks/useAuth";
import { isNonEmptyString } from "../../../util/helperFunctions";
import { ROUTES } from "../../../constants/ROUTES";
import "../Form.css";
import "./LoginForm.css";

const LoginForm = () => {
  const { login } = useAuth();
  const { assignUserInfo } = useAuth();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    id:0,
  });
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const noEmptyFields = () => {
    // return Object.values(loginData).every((v) => isNonEmptyString(v));
    if(loginData.username== "" || loginData.password==""){
      return false;}
    return true;
  };
  const checkErrors = () => {
    if (loginData.username.length === 0)
      usernameRef.current.classList.add("error");
    else usernameRef.current.classList.remove("error");
    if (loginData.password.length === 0)
      passwordRef.current.classList.add("error");
    else passwordRef.current.classList.remove("error");
  };
  const onLogin = async (e) => {
    e.preventDefault();
    checkErrors();
    if (noEmptyFields()) {
      await UserService.authenticate(loginData).then((response) => {
        if(response==null){
          //todo: add error modal
        }else{
          let newLoginData={username: loginData.username,
            password: loginData.password,
            id:response.id,};
        assignUserInfo(newLoginData); 
        login(response.jwtToken);}
      });
    }
  };
  return (
    <div className="form-container">
      <form action="POST" className="form login">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            className="form-input"
            type="text"
            id="username"
            ref={usernameRef}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                [`${e.currentTarget.id}`]: e.currentTarget.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-input"
            type="password"
            ref={passwordRef}
            id="password"
            onChange={(e) =>
              setLoginData({
                ...loginData,
                [`${e.currentTarget.id}`]: e.currentTarget.value,
              })
            }
          />
        </div>
        <div className="form-actions">
          <button className="form-button-login" onClick={(e) => onLogin(e)}>
            Log In
          </button>
        </div>
        <div className="form-links">
          <div className="register-link">
            <p>Register {`->`}</p>
            <span onClick={() => navigate(ROUTES.REGISTER)}></span>
          </div>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
