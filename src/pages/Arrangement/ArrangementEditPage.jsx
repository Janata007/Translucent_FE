import React from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Main from "../../layout/Main/Main";
import "../page.css";
import EditArrangementForm from "../../components/forms/ArrangementForms/EditArrangementForm";
const ArrangementEditPage = () => {
  return (
    <div className="task creation page">
      <Header />
      <Main />
      <Main>
        <EditArrangementForm />
      </Main>
      <Footer />
    </div>
  );
};
export default ArrangementEditPage;
