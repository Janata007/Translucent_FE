import { useState, useEffect } from "react";
import UserService from "../../../../api/UserService";
import { useAuth } from "../../../../hooks/useAuth";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();
  const id = useState(2);

  const fetchData = async () => {
    await UserService.getUserWithSector(id, token)
      .then((data) => {
        setUserInfo([...data]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [isLoading]);

  return (
    <div className="userContainer">
      <div className="jumbotron">
        <h1 className="display-4">User information</h1>
      </div>
      <div className="card">
        <div className="card-header">
          {userInfo.appUser.firstName} {userInfo.appUser.lastName}
        </div>
        <div className="card-body">
          <h5 className="card-title">{userInfo.appUser.email}</h5>
          <p className="card-text">
            Currently working at {userInfo.sector.name}
          </p>
          <a href="#" className="btn btn-primary">
            My Profile
          </a>
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
