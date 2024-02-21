import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Main from "../../../layout/Main/Main";
import Header from "../../../layout/Header/Header";
import { useNavigate } from "react-router-dom";
import Footer from "../../../layout/Footer/Footer";
import { useAuth } from "../../../hooks/useAuth";
import CompanyService from "../../../api/CompanyService";
import { ROUTES } from "../../../constants/ROUTES";
import SectorPost from "../../Sector/SectorPost";

const AllCompanies = () => {
  const [isLoading, setIsLoading] = useState(true); //for rerender after promise is fulfilled
  const { token } = useAuth();
  let navigate = useNavigate();
  const [companies, setCompanies] = useState([
    [
      {
        id: 5,
        name: "Software development",
        description: "Software development company",
        sectorList: [
          {
            id: 5,
            name: "Animation_sector",
            description:
              "this is a sector meant for organizing animation events",
            code: "AS01",
            offeredServices: ["ORGANIZATION"],
          },
        ],
      },
    ],
  ]);
  async function deleteCompany(company) {
    console.log("company deleting id: " + company.id);
    await CompanyService.deleteCompanyById(token, company.id);
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

  return (
    <div className="company list page">
      <Header />
      <Main>
        <div className="companyGrid">
          {isLoading ? (
            <p>check</p>
          ) : (
            <Grid container spacing={4}>
              {companies.map((company) => (
                <>
                  <SectorPost
                    name={company.name}
                    code={""}
                    description={company.description}
                    offeredServices={[company.sectorList]}
                  />
                  <button
                    type="button"
                    className="form-button2"
                    onClick={() => deleteCompany(company)}
                  >
                    Delete company
                  </button>
                </>
              ))}
            </Grid>
          )}
        </div>
        <button
          type="button"
          className="form-button"
          onClick={() => navigate(ROUTES.CREATE_COMPANY)}
        >
          Create new company
        </button>
        <div className="sector-add"></div>
      </Main>
      <Footer />
    </div>
  );
};

export default AllCompanies;
