import { useState, useEffect } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Cite from "citation-js";
import { MenuItem, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";

// import css file
import "../css/CiteGenerationPopup.css";

export default function CiteGenerationPopup({ bibtex }) {
  const [open, setOpen] = React.useState(false);
  //for citation
  const [citationFormat, setCitationFormat] = React.useState("all");
  const [citationData, setCitationData] = useState({
    apa: "",
    vancouver: "",
    harvard1: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //   _____________________________________________________citation___________________________________________
  //citation format input from user
  const handleChange = (event) => {
    setCitationFormat(event.target.value);
  };

  // generate citation in diff format
  const generateCitations = (citationObj, format) => {
    //also pass options(obj) in parameter
    return citationObj.format("citation", {
      format: "html",
      template: { format },
    });
  };
  //handle citation conversion
  const handleCitation = async () => {
    //create obj
    const citationObj = await Cite.async(bibtex);

    const apaCitation = generateCitations(citationObj, "apa");
    const vancouverCitation = generateCitations(citationObj, "vancouver");
    const harvard1Citation = generateCitations(citationObj, "harvard1");
    //store all citation styles in an obj
    setCitationData({
      apa: apaCitation,
      vancouver: vancouverCitation,
      harvard1: harvard1Citation,
    });
  };

  useEffect(() => {
    handleCitation();
  }, [citationFormat]);

  return (
    <>
      {/* _____________________________________________________________cite btn _________________________________ */}
      {/* Cite btn */}
      <Button
        color="primary"
        variant="outlined"
        size="small"
        sx={{
          border: " 2px solid secondary",
          borderRadius: "20px",
          textTransform: "none",
        }}
        onClick={handleClickOpen}
      >
        Cite
      </Button>
      {/* ____________________________________________popup open on clicking on cite btn___________________________ */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color="dark" variant="h4">
          Generate Citation in different citations styles
        </DialogTitle>
        <DialogContent>
          <DialogContentText color="subtle" variant="body1">
            Choose citation format:
            {/* ________citation format dropdown filter btn______________ */}
            <div>
              <FormControl
                sx={{ m: 1, minWidth: 120, marginLeft: "0px" }}
                size="medium"
                color="primary"
              >
                <Select
                  value={citationFormat}
                  onChange={handleChange}
                  displayEmpty
                  //change dropdown icon
                  IconComponent={KeyboardArrowDownIcon}
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{ borderRadius: "8px", boxColor: "red" }}
                >
                  <MenuItem value="all">ALL</MenuItem>
                  <MenuItem value="apa">APA</MenuItem>
                  <MenuItem value="vancouver">VANCOUVER</MenuItem>
                  <MenuItem value="harvard1">HARVARD1 </MenuItem>
                </Select>
              </FormControl>
              {/* ___________________________________Dispay citation styles_____________________________ */}
              <div>
                {citationFormat === "apa" || citationFormat === "all" ? (
                  <>
                    {/* apa Citation Style */}
                    <Typography variant="h6" color="subtle">
                      apa Citation Style:
                    </Typography>

                    <Paper component={Box} p={2} m={2} classname="citationItem">
                      <Typography
                        id="citation"
                        color="text"
                        variant="body2"
                        dangerouslySetInnerHTML={{ __html: citationData.apa }}
                      />
                    </Paper>
                  </>
                ) : null}
                {citationFormat === "vancouver" || citationFormat === "all" ? (
                  <>
                    {/* vancouver Citation Style */}
                    <Typography variant="h6" color="subtle">
                      vancouver Citation Style:
                    </Typography>

                    <Paper component={Box} p={2} m={2} classname="citationItem">
                      <Typography
                        id="citation"
                        color="text"
                        variant="body2"
                        dangerouslySetInnerHTML={{
                          __html: citationData.vancouver,
                        }}
                      />
                    </Paper>
                  </>
                ) : null}
                {citationFormat === "harvard1" || citationFormat === "all" ? (
                  <>
                    {/* harvard1 Citation Style */}
                    <Typography variant="h6" color="subtle">
                      harvard1 Citation Style:
                    </Typography>

                    <Paper component={Box} p={2} m={2} classname="citationItem">
                      <Typography
                        id="citation"
                        color="text"
                        variant="body2"
                        dangerouslySetInnerHTML={{
                          __html: citationData.harvard1,
                        }}
                      />
                    </Paper>
                  </>
                ) : null}
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
