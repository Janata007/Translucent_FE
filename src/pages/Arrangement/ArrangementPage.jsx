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
import { FixedSizeGrid } from 'react-window';
import Popup from 'reactjs-popup';
import ArrangementService from "../../api/ArrangementService";
import ArrangementPost from "./ArrangementPost";



const ArrangementPage = () => {
  const [isLoading, setIsLoading] = useState(true); //for rerender after promise is fulfilled
  const [id, setId]= useState(6)
  const { token } = useAuth();
  let navigate = useNavigate();
  const [arrangements, setArrangements] = useState([]);

  const fetchData = async () => {
    await ArrangementService.getAllArrangementsForUser(token, id)
      .then((data) => {
        setArrangements([...data]);
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
    <div className="sector list page">
      <Header />
      <Main>
        <div className="sectorGrid">
          {isLoading ? (
            <p>check</p>
          ) : (
            <div className="sector-add">
            { <div>
      { arrayChunk(arrangements, 3).map((items, index) => {
        return (
          <div className="sectorGrid">
            {items.map((arrangement, sIndex) => {
              return <div className="sector-item"> {<ArrangementPost
              id = {arrangement.arrangementId}
                name={arrangement.name}
                code={arrangement.code}
                duration={arrangement.duration}
                startTime={arrangement.startTime}
                endTime={arrangement.endTime}
                priority={arrangement.priority}
                participants={arrangement.participants}
              />}<div className="buttons">
              <button
            type="button"
            className="form-button2"
            onClick={() => navigate(ROUTES.ARRANGEMENT_EDIT.replace(":id",arrangement.arrangementId))}> 
            Edit
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
          onClick={() => navigate(ROUTES.CREATE_ARRANGEMENT)}
        >
          Create new Arrangement
        </button>
        <div className="more-buttons"></div>
        <button
          type="button"
          className="form-button sector-button"
          onClick={() => navigate(ROUTES.HOME)}
        >
          Return to Home
        </button>
        </div>
      <Footer />
    </div>
  );
};

export default ArrangementPage;
