import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function CompanyMainPost(props) {
  const { company } = props;
  const image = [];
  const imageText = "";
  return (
    <Paper className="main"
      sx={{
        position: "relative",
        backgroundColor: "var(--main-dark)",
        color: "#fff",
        mb: 2,
        backgroundSize: "100",
        backgroundRepeat: "no-repeat",
      }}>
      {/* Increase the priority of the background image */}
      {/* {<img style={{ display: "none" }} src={image} alt={imageText} />} */}
      <Box/>
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom>
              {company.name}
            </Typography>
            <Typography variant="h4" color="inherit" paragraph>
              {company.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
} 

CompanyMainPost.propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    sectorList: PropTypes.array.isRequired,
  }).isRequired,
};

export default CompanyMainPost;
