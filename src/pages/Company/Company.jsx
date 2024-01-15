import React from "react";

// Names of the props expected to be received
const keys = ["id", "name", "description", "sectorList"];

const CompanyResult = (props) => (
  <div>
    {keys.map((key) => {
      <span>
        {key.charAt(0) + key.slice(1)}: {props[key]}
      </span>;
    })}
  </div>
);

export default CompanyResult;
