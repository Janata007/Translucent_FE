import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { ROUTES } from "../../constants/ROUTES";


function ArrangementPost({ id, name, code, duration,startTime, endTime, priority, participants }) {
  const {userInformation}= useAuth();
  const [userId, setId]= useState(window.location.href.substring(58))
  const {token} = useAuth();
  let navigate = useNavigate();

  return (
    <Grid item xs={10} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex"}} style={{transform: "scale(0.9)"}}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {name}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {duration}
            </Typography>
            <Typography variant="subtitle2" div>
              Priority: {priority}
            </Typography>
            <Typography variant="subtitle2" div>
              {participants.map((participant) => (
                <div key={participant.userId}>{participant.username}</div>
              ))}
            </Typography>           
          </CardContent>
        </Card>
      </CardActionArea>
      {(userId==userInformation.id) &&
      <div className="task-card-buttons">
        <button type="button" className="form-button2"
            onClick={() => navigate(ROUTES.ARRANGEMENT_EDIT.replace(":id",id))}> 
            Edit
           </button>
           <button type="button" className="form-button2"
            onClick={() => navigate(ROUTES.CREATE_ARRANGEMENT_FEEDBACK.replace(":id",id))}> 
            Leave Feedback
           </button></div>}
    </Grid>
  );
}
export default ArrangementPost;
