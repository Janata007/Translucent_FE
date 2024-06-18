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
import "./AddSectorToCompany.css"
import { FixedSizeGrid } from 'react-window';


const AddSector = () => {
  const [isLoading, setIsLoading] = useState(true); //for rerender after promise is fulfilled
  let { id } = useParams();
  const { token } = useAuth();
  let navigate = useNavigate();
  const [sectorId, setSectorId] = useState(0);
  const [sectors, setSectors] = useState([]);
  let counter=0;

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
  const arrayChunk = (arr, n) => {
    const array = arr.slice();
    const chunks = [];
    while (array.length) chunks.push(array.splice(0, n));
    console.log(chunks)
    return chunks;
  };

  return (
    <div className="sector list page">
      <Header />
      <Main>
        <div className="sectorGrid">
          {isLoading ? (
            <p>check</p>
          ) : (
            <div className="sector-add">
            <div> { <div>
      { arrayChunk(sectors, 3).map((items, index) => {
        return (
          <div className="sectorGrid">
            {items.map((sector, sIndex) => {
              return <div className="sector-item"> {<SectorPost
                name={sector.name}
                code={sector.code}
                description={sector.description}
                offeredServices={[sector.offeredServices]}
              />}<div className="buttons">
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
          </div></div>;
            })}
          </div>
        );
      })}
    </div>}</div>
              {/* { sectors.map((sector) => (
                <>
                  <SectorPost
                    name={sector.name}
                    code={sector.code}
                    description={sector.description}
                    offeredServices={[sector.offeredServices]}
                  />
                  <div className="buttons">
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
              </div>
                </>
              ))} */}
            </div>
          )}
        </div>
      </Main>
      <div className="return-button">
        <button
          type="button"
          className="form-button3 form-button"
          onClick={() => navigate(ROUTES.CREATE_SECTOR)}
        >
          Return to company
        </button>
        </div>
      <Footer />
    </div>
  );
};

export default AddSector;
