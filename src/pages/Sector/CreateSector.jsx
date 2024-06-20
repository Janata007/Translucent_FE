import React from "react";
import Footer from "../../layout/Footer/Footer";
import Main from "../../layout/Main/Main";
import "../page.css";
import SectorForm from "../../components/forms/SectorForm/SectorForm";
import HeaderLoggedIn from "../../layout/Header/HeaderLoggedIn";

const CreateSector = () => {
  return (
    <div className="sector creation page">
      <HeaderLoggedIn />
      <Main />
      <Main>
        <SectorForm />
      </Main>
      <Footer />
    </div>
  );
};
export default CreateSector;
