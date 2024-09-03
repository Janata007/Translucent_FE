import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SectorService from "../../api/SectorService"
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import "./Profile.css";
import { ROUTES } from "../../constants/ROUTES";
import { useNavigate } from "react-router-dom";

function ProfileMainPost({profile}) {
 const [isLoading, setIsLoading] = useState(true); //for rerender after promise is fulfilled
  const {token} = useAuth();
  const [sectorInfo, setSectorInfo]=useState({})
  let navigate = useNavigate();
  const fetchData = async () => {
    await SectorService.findById(token, profile.sectorId)
      .then((data) => {
        setSectorInfo(data);
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
      }}>
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
              variant="h4wi"
              color="inherit"
              gutterBottom>
              {profile.firstName && console.log(profile.firstName)} {profile.lastName}
            </Typography>
            <Typography variant="subtitle1" color="inherit" paragraph>
              {profile.email}
            </Typography>
            {isLoading ? (
            <p></p>):(
        <div>
          <button
          type="button"
          className="form-button sector-button"
          onClick={() => navigate(ROUTES.SECTOR_MEMBERS.replace(":id", sectorInfo.id))}>
          {sectorInfo.name}
         </button>
         <button
          type="button"
          className="form-button company-button"
          onClick={() => {navigate(ROUTES.COMPANY.replace(":id", profile.companyId))}}>
          Check organization
         </button>
        </div>)}
       </Box>
      </Grid>
     </Grid>
   </Paper>
  </div>
  );
}
export default ProfileMainPost;
