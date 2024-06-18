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
  const [isLoading, setIsLoading] = useState(true); //for rerender after promise is fulfilled
  let { id } = useParams();
  const { token } = useAuth();
  let navigate = useNavigate();
  const [sectorId, setSectorId] = useState(0);
  const [sectors, setSectors] = useState([]);

  const fetchData = async () => {
    await SectorService.getAllSectors(token)
      .then((data) => {
        setSectors([...data]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  async function addSector(sector) {
    await CompanyService.addSectorToCompany(token, id, sector.id);
  }
  const deleteSector = async (id) => {
    console.log(id);
    setIsLoading(true)
    await CompanyService.deleteSector(token, id).then(
     setIsLoading(false)
    );
  };

  return (
    <div className="sector list page">
      <Header />
      <Main>
        <div className="sectorGrid">
          {isLoading ? (
            <p>check</p>
          ) : (
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
                    onClick={() => addSector(sector)}
                  >
                    Add to company
                  </button>
                  <button
                type="button"
                className="form-button2"
                onClick={() => deleteSector(sector.id)}
              > 
                Remove
              </button>
                </>
              ))}
            </Grid>
          )}
        </div>
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
