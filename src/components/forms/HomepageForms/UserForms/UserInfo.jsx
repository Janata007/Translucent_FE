import { useState, useEffect } from "react";
import UserService from "../../../../api/UserService";
import { useAuth } from "../../../../hooks/useAuth";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    appUser: {
      userId: 12,
      firstName: "False Dwight",
      lastName: "Schrute",
      email: "d.schrute@mail",
      sectorId: 6,
      companyId: null,
      password: "user",
      role: null,
      workVisible: false,
      superiorId: null,
      arrangements: [],
      accountNonExpired: true,
      accountNonLocked: true,
      credentialsNonExpired: true,
      enabled: true,
      authority: null,
      username: "dschrute",
      authorities: [
        {
          authority: null,
        },
      ],
    },
    sector: {
      id: 6,
      name: "Checking_Sector",
      code: "CS01",
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();
  const id = useState(12);

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
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
