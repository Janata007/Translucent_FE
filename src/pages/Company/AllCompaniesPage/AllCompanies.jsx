import React, { useEffect, useState } from "react";
import Main from "../../../layout/Main/Main";
import Header from "../../../layout/Header/Header";
import { useNavigate } from "react-router-dom";
import Footer from "../../../layout/Footer/Footer";
import { useAuth } from "../../../hooks/useAuth";
import CompanyService from "../../../api/CompanyService";
import { ROUTES } from "../../../constants/ROUTES";
import "./AllCompanies.css";
import CompanyPost from "../CompanyPost";
import Scroll from "react-scroll-component";
import SectorPost from "../../Sector/SectorPost";
import HeaderLoggedIn from "../../../layout/Header/HeaderLoggedIn";
import UserService from "../../../api/UserService";


const AllCompanies = () => {
  const [isLoading, setIsLoading] = useState(true); //for rerender after promise is fulfilled
  const { token } = useAuth();
  let navigate = useNavigate();
  const {userInformation} = useAuth();
  const [companies, setCompanies] = useState([]);
  const [userInfo, setUserInfo] = useState({});


  async function deleteCompany(companyId) {
    await CompanyService.deleteCompanyById(token, companyId);
    window.location.reload();
  }
  const fetchData = async () => {
    await CompanyService.getAllCompanies(token)
      .then((data) => {
        setCompanies(data);
      })
      await UserService.getUser(userInformation.id, token).then((data)=>{
        setUserInfo(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className="company list page">
      <HeaderLoggedIn />
      <Main>
      <div className="companyGrid">
      <Scroll   direction="vertical" height={`510px`} scrollerClass={"scroller"}>
      {isLoading ? (
            <p>check</p>
          ) : (companies.map((c)=>{
            return <div className="company-item"><CompanyPost company={c}></CompanyPost>
            {userInfo.role ==="ADMINISTRATOR" && <button
            type="button"
            className="form-button"
            onClick={() => deleteCompany(c.id)}> 
            Remove
              </button>}
              <button
            type="button"
            className="form-button"
            onClick={() =>navigate(ROUTES.COMPANY.replace(":id", c.id)) }> 
            Details
              </button>
            </div>
          }))}</Scroll>
      </div>
      </Main>
      <div className="more-buttons">
      {userInfo.role ==="ADMINISTRATOR" && <button
          type="button"
          className="form-button"
          onClick={() => navigate(ROUTES.CREATE_COMPANY)}>
          Create new Company
      </button>}
        <button
          type="button"
          className="form-button"
          onClick={() => navigate(ROUTES.HOME)}>
          Return to Home
       </button>
     </div>
      <Footer />
    </div>
  );
};
export default AllCompanies;
