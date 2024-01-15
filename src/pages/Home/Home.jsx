import React from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Main from "../../layout/Main/Main";
import "../page.css";
import "./Home.css";
import SearchBar from "../../components/forms/HomepageForms/SearchBar";

const Home = () => {
  return (
    <div className="home page">
      <Header />
      <Main />
      <SearchBar></SearchBar>
      <Footer />
    </div>
  );
};

export default Home;
