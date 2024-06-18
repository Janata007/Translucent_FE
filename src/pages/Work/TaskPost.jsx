import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";

function TaskPost({ id, name, priority, description,finished, dateDue, dateCreated, accepted }) {
  return (
    <Grid item xs={10} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex"}} style={{transform: "scale(0.9)"}}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {name}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {description}
            </Typography>
            <Typography variant="subtitle2" div>
              Due: {dateDue}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default TaskPost;
