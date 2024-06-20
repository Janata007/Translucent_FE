import React from "react";
import Footer from "../../layout/Footer/Footer";
import Main from "../../layout/Main/Main";
import "../page.css";
import EditArrangementForm from "../../components/forms/ArrangementForms/EditArrangementForm";
import HeaderLoggedIn from "../../layout/Header/HeaderLoggedIn";
const ArrangementEditPage = () => {
  return (
    <div className="task creation page">
      <HeaderLoggedIn />
      <Main />
      <Main>
        <EditArrangementForm />
      </Main>
      <Footer />
    </div>
  );
};
export default ArrangementEditPage;
