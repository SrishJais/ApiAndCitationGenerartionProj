import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { mysearchContext } from "../App";
import { useContext } from "react";

import "../css/MyCard.css";
import CiteGenerationPopup from "./CiteGenerationPopup";
import { IconButton } from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function MyCard({ item }) {
  const { searchTypechecked } = useContext(mysearchContext); //global context

  const paperId = item.paperId;
  //domain extract from url
  const url = item.url;
  const url_obj = new URL(url); //create url obj having hostname property (using URL constructor)
  const domain = url_obj.hostname; // domain name from url

  const title = item.title;
  const abstract = item.abstract;
  const citationCount = item.citationCount;
  const pdfUrl = item.openAccessPdf && item.openAccessPdf.url;

  //Extract yr from bibtex
  const bibtex = item.citationStyles && item.citationStyles.bibtex;
  // Define a regular expression to match the year
  const yearRegex = /year\s*=\s*{(\d{4})}/;
  // Use the regular expression to extract the year
  const bibtexYr = bibtex.match(yearRegex)[1];

  return (
    <Card sx={{ minWidth: 150 }}>
      <CardContent sx={{ padding: "8px" }}>
        {/* -----------------------------------------card header------------------------------------- */}
        <div className="flexSpaceBtw">
          <Box display="flex" alignItems="center">
            {/* Domain  */}
            <Typography
              variant="p"
              sx={{ fontSize: "12px" }}
              color="subtle"
              gutterBottom
            >
              {domain && domain}
              {pdfUrl && bull}
            </Typography>
            {/* Pdf link  */}
            <Typography variant="linkText" color="secondary">
              {/* open link in new tab to avoid refresh of cureent page */}
              {pdfUrl && (
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  PDF
                </a>
              )}
            </Typography>
          </Box>
          {/* Bokmark icon */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton className="muiIcon">
              <BookmarkBorderIcon color="primary" />
            </IconButton>
            {/* Bokmark text */}
            <Typography
              variant="smallText"
              color="subtle"
              sx={{ fontSize: 12 }}
            >
              Bookmark
            </Typography>
            {/* MoreVertIcon */}
            <IconButton className="muiIcon" sx={{ paddingRight: "0px" }}>
              <MoreVertIcon color="primary" />
            </IconButton>
          </Box>
        </div>
        {/* -----------------------------------------card content------------------------------------- */}
        {/* Title */}
        <Typography variant="h4" component="div" color="dark">
          {title}
        </Typography>

        {/* card author */}
        <Box sx={{ display: "flex" }}>
          {item.authors &&
            item.authors.slice(0, 2).map((val) => (
              <Typography
                variant="smallText"
                sx={{ fontSize: "10px" }}
                color="text.subtle"
                gutterBottom
                key={val.authorId}
              >
                {val.name} ,
              </Typography>
            ))}

          <Typography
            variant="smallText"
            sx={{ fontSize: "10px" }}
            color="text.primary"
          >
            {bibtexYr} - {item.journal.name}
          </Typography>
        </Box>

        <Typography variant="body2" className="ellipsisText" color="text">
          {abstract && abstract}
        </Typography>
      </CardContent>
      {/* -----------------------------------------card footer------------------------------------- */}

      <CardActions>
        {searchTypechecked === true ? (
          <div
            className="flexSpaceBtw"
            style={{ width: "100%", alignItems: "center" }}
          >
            <div style={{ display: "flex" }}>
              <Typography
                color="subtle"
                variant="smallText"
                sx={{
                  paddingRight: "8px",
                  fontSize: "12px",
                }}
              >
                Cited by {citationCount && citationCount}
              </Typography>

              <Typography
                color="secondary"
                variant="linkText"
                sx={{ fontSize: "12px" }}
              >
                <a href="#" className="href">
                  View all versions
                </a>
              </Typography>
            </div>
            <div>
              <CiteGenerationPopup bibtex={item.citationStyles.bibtex} />
              <Button
                color="primary"
                variant="contained"
                size="small"
                sx={{
                  marginLeft: "6px",
                  borderRadius: "20px",
                  textTransform: "none",
                }}
              >
                Explore
              </Button>
            </div>
          </div>
        ) : (
          // get content btn
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <Button
              color="primary"
              variant="contained"
              size="small"
              sx={{
                borderRadius: "20px",
                textTransform: "none",
              }}
            >
              Get Content
            </Button>
          </Box>
        )}
      </CardActions>
    </Card>
  );
}
