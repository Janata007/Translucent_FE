import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";

function FeedbackPost({ description, grade, percent }) {
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              Grade: {grade}
            </Typography>
            <Typography variant="subtitle1" paragraph>
             Percent: {percent}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {description}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
export default FeedbackPost;
