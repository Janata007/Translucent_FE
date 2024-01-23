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
import CreateSector from "../Sector/CreateSector";

const Company = () => {
  let { id } = useParams();
  const { token } = useAuth();
  let navigate = useNavigate();
  let company = {
    id: 5,
    name: "Software development",
    description: "Software development company",
    sectorList: [
      {
        id: 4,
        name: "Marketing_sector",
        code: "MS01",
        offeredServices: ["MARKETING"],
      },
    ],
  };

  useEffect(() => {
    const fetchData = async (id) => {
      console.log(id);
      company = await CompanyService.findCompanyById(token, id);
      return company;
    };
  }, []);

  return (
    <div className="company info page">
      <Header />
      <Main>
        {/* <Grid container spacing={4}>
          {company.map((name) => (
            <CompanyPost key={name} post={"name"} />
          ))}
        </Grid> */}
        <CompanyPost key={company.id} company={company}></CompanyPost>
        <button
          type="button"
          className="form-button"
          onClick={() => navigate(ROUTES.CREATE_SECTOR)}
        >
          Create new sector
        </button>
      </Main>
      <Footer />
    </div>
  );
};

export default Company;
