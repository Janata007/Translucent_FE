import React, { useState, useRef } from "react";
import { userNavigate } from "react-router";
import UserService from "../../api/UserService";
import { useAuth } from "../../hooks/useAuth";
import "../forms/Form.css";

const LoginForm = () => {
  const { login } = useAuth();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const usernameRef = useRef();
  const passwordRef = useRef();
  const naivgate = useNavigate();
  const noEmptyFields = () => {
    return Object.values(loginData).every((v) => isNonEmptyString(v)); //from helperFunctions
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
      await UserService.authenticate(loginData).then((response) =>
        login(response.jwtToken)
      );
    }
  };
  const onRegisterLink = () => {
    console.log("navigated to register page");
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
            type="text"
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
          <button className="form-button" onClick={(e) => onLogin(e)}>
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
