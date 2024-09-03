import { useState, useEffect } from "react";
import UserService from "../../../../api/UserService";
import { useAuth } from "../../../../hooks/useAuth";
import { useDebounce } from "../../../../hooks/useDebounce";

const UserInfo = () => {
  const {loggedInUserInfo} = useAuth();
  const {userInformation} = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();
  const [id, setId] = useState(userInformation.id);
  const fetchData2 = async () => {
    const userStuff = await UserService.getUserWithSector(
      id,
      token
    );
    return userStuff;
  };
  useEffect(() => {
    setIsLoading(true);
  }, []);

  useDebounce(
    async () => {
      try {
        const userStuff = await fetchData2();
        setUserInfo(userStuff)
      } catch (error) {
        console.log(error);
      }
    },
    1000,
    [isLoading]
  );

  return (
    <div className="userContainer">
      <div className="jumbotron">
        <h1 className="display-4">User information</h1>
      </div>
      <div className="card">
        <div className="card-header">
          {loggedInUserInfo.firstName} {loggedInUserInfo.lastName}
        </div>
        <div className="card-body">
          <h5 className="card-title">{loggedInUserInfo.email}</h5>
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
