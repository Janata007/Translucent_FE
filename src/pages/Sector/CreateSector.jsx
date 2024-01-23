import React from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Main from "../../layout/Main/Main";
import "../page.css";
import SectorForm from "../../components/forms/SectorForm/SectorForm";

const CreateSector = () => {
  return (
    <div className="sector creation page">
      <Header />
      <Main />
      <Main>
        <SectorForm />
      </Main>
      <Footer />
    </div>
  );
};
export default CreateSector;
