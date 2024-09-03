import React, { useEffect, useState } from "react";
import Main from "../../layout/Main/Main";
import Header from "../../layout/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../layout/Footer/Footer";
import { useAuth } from "../../hooks/useAuth";
import CompanyService from "../../api/CompanyService";
import SectorService from "../../api/SectorService";
import { ROUTES } from "../../constants/ROUTES";
import SectorPost from "./SectorPost";
import { Modal } from "@mui/material";
import "./AddSectorToCompany.css"
import "../Home/Home.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Popup from 'reactjs-popup';
import HeaderLoggedIn from "../../layout/Header/HeaderLoggedIn";
import Scroll from "react-scroll-component"


const AddSector = () => {
  const [isLoading, setIsLoading] = useState(true); //for rerender after promise is fulfilled
  let id  = (window.location.href.split("/"))[5];
  const { token } = useAuth();
  let navigate = useNavigate();
  const [sectors, setSectors] = useState([]);
  const [sectorAdded, setSectorAdded]=useState(false);

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
    setSectorAdded(true);
    console.log(sector.id)
    await CompanyService.addSectorToCompany(token, id, sector.id);
  }
  const deleteSector = async (id) => {
    await CompanyService.deleteSector(token, id).then(
    );
    window.location.reload();
  };
  const arrayChunk = (arr, n) => {
    const array = arr.slice();
    const chunks = [];
    while (array.length) chunks.push(array.splice(0, n));
    return chunks;
  };
  
  var popup =  <Modal  className="modal"
  open={addSector}
  onClose={()=>{}}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
><div onClick={()=>setSectorAdded(false)}>
<Card>
          <CardContent className="popup-card">
            <Typography component="h2" variant="h5">
              Sector has been added to company
            </Typography>
            <Typography variant="subtitle2" div>
             click on me to close
            </Typography>
          </CardContent>
        </Card>
        </div>
</Modal>;
  return (
    <div className="sector list page">
      <HeaderLoggedIn />
      <Main>
      <div className="sector-section">
      {sectorAdded && popup}
      <Scroll   direction="vertical"
        height={`320px`}
        width={'10px'}
        scrollerClass={"scroller"}>
        <div className="taskGrid">
          {isLoading ? (
            <p>check</p>
          ) : (
            <div className="company-add">
            { <div className="tasks">
        {arrayChunk(sectors, 2).map((items, index) => {
        return (
          <div className="taskGrid">
            {items.map((sector, sIndex) => {
              return <div className="company-item"> {<SectorPost
                name={sector.name}
                code={sector.code}
                description={sector.description}
                offeredServices={[sector.offeredServices]}
              />}<div className="sector-buttons">
                <button
                type="button"
                className="form-button2"
                onClick={() => addSector(sector)} >
                Add to company
                </button>
              <Popup class= "popup" trigger={<></>} position="left">
                 <div>Sector has been added</div>
               </Popup>
              <button
            type="button"
            className="form-button2"
            onClick={() => deleteSector(sector.id)}> 
            Remove
           </button>
           </div></div>;})}
           </div>);})}
           </div>}
           </div>
        )}
        </div>
        </Scroll>
      </div>
        {/* <div className="sectorGrid-container">
          {isLoading ? (<p>check</p>) : (
        <div className="sector-add">
          {<div>
      { arrayChunk(sectors, 3).map((items, index) => {
        return (
          <div className="sectorGrid">
             <Scroll   direction="vertical"
        height={`520px`}
        width={'10px'}
        scrollerClass={"scroller"}>
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
                onClick={() => addSector(sector)} >
                Add to company
                </button>
              <Popup class= "popup" trigger={<></>} position="left">
                 <div>Sector has been added</div>
               </Popup>
              <button
            type="button"
            className="form-button2"
            onClick={() => deleteSector(sector.id)}> 
            Remove
           </button></div>
           </div>;})}
          </Scroll></div>);})}
          </div>}
        </div>)}
        </div> */}
      </Main>
      <div className="more-buttons">
      <button
          type="button"
          className="form-button"
          onClick={() => navigate(ROUTES.CREATE_SECTOR)}>
          Create new Sector
      </button>
        <button
          type="button"
          className="form-button"
          onClick={() => navigate(ROUTES.COMPANY.replace(":id",id))}>
          Return to Company
       </button>
     </div>
      <Footer />
    </div>
  );
};
export default AddSector;
