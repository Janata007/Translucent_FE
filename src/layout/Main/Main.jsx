import React from "react";
import "./Main.css";

const Main = () => {
  return (
    <main className="main">
      <div className="main-background"></div>
      {children}
    </main>
  );
};

export default Main;
