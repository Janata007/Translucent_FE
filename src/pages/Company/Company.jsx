import React, { useEffect, useState } from "react";
import "./Company.css";
import Grid from "@mui/material/Grid";
import CompanyPost from "./CompanyPost";
import Main from "../../layout/Main/Main";
import Header from "../../layout/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../layout/Footer/Footer";
import { useAuth } from "../../hooks/useAuth";
import CompanyService from "../../api/CompanyService";
import { ROUTES } from "../../constants/ROUTES";
import CompanyMainPost from "./CompanyMainPost";
import SectorPost from "../Sector/SectorPost";

const Company = () => {
  const [loaded, setLoaded] = useState(false); //for rerender after promise is fulfilled
  let { id } = useParams();
  const { token } = useAuth();
  let navigate = useNavigate();
  const [hidden, setHidden] = useState(true); //for adding a sector to company
  const [sectors, setSectors] = useState([]);
  const [company, setCompany] = useState({
    id: 5,
    name: "Companyy",
    description: "company",
    sectorList: [
      {
        id: 4,
        name: "hurbur",
        code: "MS01",
        offeredServices: ["MARKETING"],
      },
    ],
  });
  const redirect = (company) => {
    console.log(company.id);
    navigate(ROUTES.ADD_SECTOR_TO_COMPANY + company.id);
  };
  async function fetchCompanyData() {
    await CompanyService.findCompanyById(token, id).then((data) => {
      setCompany(data);
      setSectors(data.sectorList);
    });
  }
  const removeSector = async (id) => {
    console.log(id);
    await CompanyService.deleteSectorFromCompany(token, company.id, id).then(
      (data) => {
        setCompany(data);
        setSectors(data.sectorList);
      }
    );
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);
  useEffect(() => {}, [company]);

  return (
    <div className="company info page">
      <Header />
      <Main>
        <Grid container spacing={4}>
          {sectors.map((sector) => (
            <>
              <SectorPost
                name={sector.name}
                code={sector.code}
                description={sector.description}
                offeredServices={[sector.offeredServices]}
              />
              <button
                type="button"
                className="form-button2"
                onClick={() => removeSector(sector.id)}
              >
                Delete from company
              </button>
            </>
          ))}
        </Grid>
        <CompanyMainPost key={company.id} company={company}></CompanyMainPost>
        <button
          type="button"
          className="form-button"
          onClick={() => navigate(ROUTES.CREATE_SECTOR)}
        >
          Create new sector
        </button>
        <button
          type="button"
          className="form-button"
          onClick={() => redirect(company)}
        >
          Add sector to company
        </button>
        <div className="sector-add"></div>
      </Main>
      <Footer />
    </div>
  );
};

export default Company;
