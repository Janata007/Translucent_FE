import React from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Main from "../../layout/Main/Main";
import "../page.css";
import "./Home.css";
import SearchBar from "../../components/forms/HomepageForms/SearchBar";
import UserInfo from "../../components/forms/HomepageForms/UserInfo";
import TaskInfo from "../../components/forms/HomepageForms/TaskInfo";

const Home = () => {
  return (
    <div className="home page">
      <Header />
      <Main>
        <SearchBar></SearchBar>
        <UserInfo></UserInfo>
        <TaskInfo></TaskInfo>
      </Main>
      <Footer />
    </div>
  );
};

export default Home;
