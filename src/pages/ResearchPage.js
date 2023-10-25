import React from "react";
import SearchData from "../components/SearchData";
import LogoBAW from "../assets/LogoBAW.png";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "../css/ResearchPage.css";

const ResearchPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      id="searchPage"
      alignItems="center"
      flexDirection="column"
    >
      {/* logo & search searchHeading */}
      <Box display="flex">
        {/* Add logo img */}
        <img src={LogoBAW} alt="Logo black and white" width="31" height="31" />
        {/* Brandname */}
        <Typography
          variant="h3"
          component="h2"
          pl={1}
          id="searchHeading"
          color="subtle"
        >
          QuillBot Search
        </Typography>
      </Box>
      {/* search imput field */}
      <SearchData />
      {/* searchTheWebbtn */}
      <div>
        <Link to="/searchResultPage" className="link_comp ">
          <Button
            variant="contained"
            id="searchTheWebbtn"
            color="primary"
            className=""
          >
            Search the Web
          </Button>
        </Link>
      </div>
    </Box>
  );
};

export default ResearchPage;
