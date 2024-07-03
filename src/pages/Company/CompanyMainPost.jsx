import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CompanyService from "../../api/CompanyService";
import { useState, useEffect } from "react";
import { useAuth} from "../../hooks/useAuth";

function CompanyMainPost(props) {
  const [isLoading, setIsLoading] = useState(true); //for rerender after promise is fulfilled
  const { company } = props;
  const {token} = useAuth();
  const [services, setServices]=useState([])
  const image = [];
  const imageText = "";
  const fetchData = async () => {
    await CompanyService.getOfferedServicesForCompany(token, company.id)
      .then((data) => {
        setServices(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

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
            <Typography variant="subtitle2" div>
              Services offered:
              {services && services.map((service) => (
                <div>{service}</div>
              ))}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CompanyMainPost;
