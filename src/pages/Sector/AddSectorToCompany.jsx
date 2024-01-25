import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Main from "../../layout/Main/Main";
import Header from "../../layout/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../layout/Footer/Footer";
import { useAuth } from "../../hooks/useAuth";
import CompanyService from "../../api/CompanyService";
import SectorService from "../../api/SectorService";
import { ROUTES } from "../../constants/ROUTES";
import SectorPost from "./SectorPost";

const AddSector = () => {
  const [loaded, setLoaded] = useState(false); //for rerender after promise is fulfilled
  let { id } = useParams();
  const { token } = useAuth();
  let navigate = useNavigate();
  const [sectorId, setSectorId] = useState(0);
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    async function fetchSectors() {
      setSectors(await SectorService.getAllSectors(token));
    }
    fetchSectors();
    console.log(sectors);
  }, []);

  async function addSector() {
    await CompanyService.addSectorToCompany(token, id, sectorId);
  }

  return (
    <div className="sector list page">
      <Header />
      <Main>
        {/* <Grid container spacing={4}>
          {sectors.map((sector) => (
            <SectorPost key={sector.id} post={"sector"} />
          ))}
        </Grid> */}
        {/* <SectorPost key={sectors[1].id} sector={sectors[1]}></SectorPost> */}
        <button
          type="button"
          className="form-button"
          onClick={() => navigate(ROUTES.CREATE_SECTOR)}
        >
          Return to company
        </button>
        <div className="sector-add"></div>
      </Main>
      <Footer />
    </div>
  );
};

export default AddSector;
