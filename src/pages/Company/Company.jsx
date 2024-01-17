import React from "react";
import "./Company.css";

// Names of the props expected to be received
const keys = ["id", "name", "description", "sectorList"];

const Company = (props) => (
  <div>
    {keys.map((key) => {
      <span
        onClick={() => {
          console.log("Option clicked");
        }}
      >
        {key.charAt(0) + key.slice(1)}: {props[key]}
      </span>;
    })}
  </div>
);

export default Company;
