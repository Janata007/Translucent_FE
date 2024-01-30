import { useState, useEffect } from "react";
import UserService from "../../../api/UserService";
import { useAuth } from "../../../hooks/useAuth";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const token = useAuth();
  const id = useState(1);

  const fetchData = async () => {
    await UserService.getUser(id, token)
      .then((data) => {
        setUserInfo([...data]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="userContainer">
      <div className="jumbotron">
        <h1 className="display-4">User information</h1>
      </div>
      <div className="card">
        <div className="card-header">
          {userInfo.firstName} {userInfo.lastName}
        </div>
        <div className="card-body">
          <h5 className="card-title">{userInfo.email}</h5>
          <p className="card-text">Currently working as {userInfo.role}</p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
