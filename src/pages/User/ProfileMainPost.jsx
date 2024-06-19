import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import SectorService from "../../api/SectorService"
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import "./Profile.css";


function ProfileMainPost({profile}) {
 const [isLoading, setIsLoading] = useState(true); //for rerender after promise is fulfilled
  const image = [];
  const {token} = useAuth();
  const imageText = "";
  const [sectorInfo, setSectorInfo]=useState({})
  const fetchData = async () => {
    await SectorService.findById(token, profile.sectorId)
      .then((data) => {
        setSectorInfo({...data});
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="profile-post">
    <Paper className="main"
      sx={{
        position: "relative",
        backgroundColor: "var(--main-dark)",
        color: "#fff",
        mb: 2,
        backgroundSize: "100",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Increase the priority of the background image */}
      {/* {<img style={{ display: "none" }} src={image} alt={imageText} />} */}
      <Box
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
              variant="h4"
              color="inherit"
              gutterBottom
            >
              {profile.firstName} {profile.lastName}
            </Typography>
            <Typography variant="h4" color="inherit" paragraph>
              {profile.email}
            </Typography>
            <Typography variant="h4" color="inherit" paragraph>
              {sectorInfo.name}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
    </div>
  );
}

export default ProfileMainPost;
