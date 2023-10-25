// import css file
import "../css/SearchData.css";
//import from package
import React from "react";
import { Paper, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { useLocation } from "react-router-dom";

import { mysearchContext } from "../App";
import { useContext } from "react";

// ____________________________________________________________searchData section________________________________________________

const SearchData = () => {
  const { searchTerm, setSearchTerm, searchTypechecked, setSearchTypechecked } =
    useContext(mysearchContext); //global context

  //show and hide switch input and right arrow icon
  const location = useLocation();

  return (
    <Grid container display="flex" justifyContent="center">
      {/* width 100% given as flex within flex present */}
      <Grid item md={4} width="100%">
        <Paper
          component={Box}
          sx={{ display: "flex", alignItems: "center", borderRadius: "20px" }}
          id="searchInputSection"
          mt={2}
          mb={4}
          pr={1}
          elevation={0}
        >
          <IconButton
            type="button"
            aria-label="search"
            id="searchTerm_icon"
            color="primary"
          >
            {/* search icon */}
            <SearchIcon />
          </IconButton>

          <InputBase
            color="primary"
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            name="searchTerm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* -------switch------- */}
          {location.pathname === "/researchpage" ||
          location.pathname === "/" ? (
            <FormControlLabel
              color="primary"
              control={<Switch />}
              label="Academic"
              labelPlacement="start"
              name="SearchTypechecked"
              checked={searchTypechecked}
              value={searchTypechecked}
              onChange={(e) => setSearchTypechecked(e.target.checked)}
            />
          ) : null}
          {location.pathname === "/searchResultPage" ? (
            <IconButton className="muiIcon" color="primary">
              <ArrowForwardOutlinedIcon id="directionBtn" />
            </IconButton>
          ) : null}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SearchData;
