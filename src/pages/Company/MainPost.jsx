import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

function MainPost(props) {
  const { employee } = props;
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
        backgroundImage: `url(${employee.image})`,
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
              {employee.firstName}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {employee.lastName}
            </Typography>
            <Link variant="subtitle1" href="#">
              {employee.email}
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainPost.propTypes = {
  employee: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    arrangements: PropTypes.array.isRequired,
  }).isRequired,
};

export default MainPost;
