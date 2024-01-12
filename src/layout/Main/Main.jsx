import React from "react";
import "./Main.css";

const Main = ({ children }) => {
  return (
    <main className="main">
      <div className="main-content">{children}</div>
      <div className="main-background"></div>
    </main>
  );
};

export default Main;
