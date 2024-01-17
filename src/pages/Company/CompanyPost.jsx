import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";

function CompanyPost(props) {
  const { company } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {company.name}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {company.description}
            </Typography>
            <Typography variant="subtitle2" div>
              {company.sectorList.map((sector) => (
                <div key={sector.id}>{sector.name}</div>
              ))}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

CompanyPost.propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    sectorList: PropTypes.array.isRequired,
  }).isRequired,
};

export default CompanyPost;
