import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";

function UserPost({ id, firstName, lastName, userName, email}) {
  return (
    <Grid item xs={10} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex"}} style={{transform: "scale(0.9)"}}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {userName}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {firstName} {lastName}
            </Typography>
            <Typography variant="subtitle2" div>
              Mail: {email}
            </Typography>          
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default UserPost;
