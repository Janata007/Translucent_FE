import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

function CompanyMainPost(props) {
  const { company } = props;
  const image = [];
  const imageText = "";

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(../../assets/logo_pink.png)`,
      }}
    >
      {/* Increase the priority of the background image */}
      {<img style={{ display: "none" }} src={image} alt={imageText} />}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
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
