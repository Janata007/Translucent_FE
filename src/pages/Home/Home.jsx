import React from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Main from "../../layout/Main/Main";
import "../page.css";
import "./Home.css";

const Home = () => {
  return (
    <div className="home page">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Home;
