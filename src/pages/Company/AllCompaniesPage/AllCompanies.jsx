import React, { useEffect, useState } from "react";
import Main from "../../../layout/Main/Main";
import Header from "../../../layout/Header/Header";
import { useNavigate } from "react-router-dom";
import Footer from "../../../layout/Footer/Footer";
import { useAuth } from "../../../hooks/useAuth";
import CompanyService from "../../../api/CompanyService";
import { ROUTES } from "../../../constants/ROUTES";
import SectorPost from "../../Sector/SectorPost";
import "./AllCompanies.css";

const AllCompanies = () => {
  const [isLoading, setIsLoading] = useState(true); //for rerender after promise is fulfilled
  const { token } = useAuth();
  let navigate = useNavigate();
  const [companies, setCompanies] = useState([
  ]);
  async function deleteCompany(companyId) {
    console.log("company deleting id: " + companyId);
    await CompanyService.deleteCompanyById(token, companyId);
    window.location.reload();
  }

  const fetchData = async () => {
    await CompanyService.getAllCompanies(token)
      .then((data) => {
        setCompanies([...data]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const arrayChunk = (arr, n) => {
    const array = arr.slice();
    const chunks = [];
    while (array.length) chunks.push(array.splice(0, n));
    console.log(chunks)
    return chunks;
  };
  return (
    <div className="company list page">
      <Header />
      <Main>
        <div className="companyGrid">
          {isLoading ? (
            <p>check</p>
          ) : (
            <div className="company-add">
            { <div>
      { arrayChunk(companies, 3).map((items, index) => {
        return (
          <div className="companyGrid">
            {items.map((company, sIndex) => {
              return <div className="company-item"> {<SectorPost
                name={company.name}
                code={""}
                description={company.description}
                offeredServices={[company.sectorList]}
              />}<div className="buttons">
              <button
            type="button"
            className="form-button2"
            onClick={() => deleteCompany(company.id)}> 
            Remove
           </button>
           </div>
           </div>;
            })}
           </div>
            );
            })}
           </div>}
            </div>
          )}
        </div>
      </Main>
      <div className="more-buttons">
      <button
          type="button"
          className="form-button sector-button"
          onClick={() => navigate(ROUTES.CREATE_COMPANY)}
        >
          Create new Company
        </button>
        <div className="more-buttons"></div>
        <button
          type="button"
          className="form-button company-button"
          onClick={() => navigate(ROUTES.HOME)}
        >
          Return to Home
        </button>
        </div>
      <Footer />
    </div>
  );
};

export default AllCompanies;
