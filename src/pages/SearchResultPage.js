import React, { useEffect } from "react";
import { mysearchContext } from "../App";
import { useContext, useState } from "react";
import SearchData from "../components/SearchData";
import { IconButton, Typography } from "@mui/material";
import axios from "axios";
import MyCard from "../components/MyCard";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";

// import css file
import "../css/SearchResultPage.css";

const SearchResultPage = () => {
  //------------------------global context----------------------
  const { searchTerm, searchTypechecked, setSearchTypechecked } =
    useContext(mysearchContext);

  //fetched data stored
  const [fetchedData, setFetchedData] = useState("");

  const [searchResultData, setSearchResultData] = useState([]);

  //----------------------fetch fn from api----------------
  const handleFetching = async () => {
    const url = "https://indegenousapiprojectbackend.onrender.com/data";
    try {
      //do post req using axios
      //in axios , we can send JS obj as it is directly without any conversion
      // axios fn return response which also remains in JS object(which has data as obj containing arr of obj) so no req to convert

      // _____________api limit ends so instead of post , I used its json file and get req but post will work also_______________
      //The payload is (an essential part of a REST API) a JS obj which contains the actual data being transferred between the client
      // and the server

      // const payload = {
      //   "keyword": "ai",
      //   "limit": "10"
      // };
      // const res = await axios.post(url,payload);
      // const resData =res.data;

      // setFetchedData(resData.data);//as per requirement
      // console.log(resData.data);

      //-------------------using data from json file and using get request
      const res = await axios.get(url);
      const resData = res.data;

      setFetchedData(resData); //as per requirement
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFetching();
  }, []);
  //-----------------------------------------------------------------

  //_----------------for back btn navifation-------------------------
  const navigate = useNavigate();

  //----------------Masonry(frid breakpont for cards dynamic height)-----
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };
  // //--------------searchResult fn------------------------------------
  //handle fetching
  const handleSearchResult = () => {
    //search only if data is present
    if (fetchedData && fetchedData.length !== 0) {
      //by default search term remains empty,show all data
      if (searchTerm === "") setSearchResultData([]);
      else {
        const searchResults = fetchedData.filter((val) =>
          val.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResultData(searchResults);
      }
    }
  };
  useEffect(() => {
    handleSearchResult();
  }, [searchTerm, fetchedData]);

  return (
    <Box px={1}>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          {/* -----back btn------- */}
          <IconButton
            color="primary"
            className="muiIcon"
            onClick={() => {
              navigate(-1);
            }}
            sx={{ padding: "0px" }}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <Typography color="subtle" variant="body1">
            Back
          </Typography>
        </Box>
        <Box>
          {/* -------switch------ */}
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
        </Box>
      </Box>

      {/* search imput field */}
      <SearchData />
      <Typography variant="h4" component="h6" pb={1} color="dark">
        {searchTypechecked === true ? "Academic Results" : "Web Results"}
      </Typography>

      {/* Rendiring each card item */}

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {/* Render data based on search term by title */}
        {searchResultData &&
          searchResultData.map((val) => <MyCard item={val} key={val.paperId}/>)}
      </Masonry>

      {/* display when no info related to search tem is found */}
      {searchResultData && searchResultData.length === 0 ? (
        <Typography
          variant="h4"
          display="flex"
          justifyContent="center"
          color="subtle"
        >
          No result
        </Typography>
      ) : (
        ""
      )}
    </Box>
  );
};

export default SearchResultPage;
