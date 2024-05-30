import React from "react";
import noData from "../assets/no_data.svg";
import Typography from "@mui/material/Typography";

const NoResultsFound = () => {
  return (
    <div>
      <Typography variant="h6" align="center">
        No Results Found
      </Typography>
      <img src={noData} alt="No results found" width="300" height="300" />
    </div>
  );
};

export default NoResultsFound;
