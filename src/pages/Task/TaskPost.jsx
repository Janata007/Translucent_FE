import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import WorkService from "../../api/WorkService";
import { useAuth } from "../../hooks/useAuth";

function TaskPost({ id, name, priority, description, finished, accepted, dateDue }) {
  const {token} = useAuth();
  const finishTask = async (id)=>{
    await WorkService.setTaskToFinished(token, id)
    .then((data) => {
      finished= data.finished;
    })
    .finally(() => {
        window.location.reload()
  });  }
  const acceptTask = async (id)=>{
    await WorkService.acceptTask(token, id)
    .then((data) => {
      accepted= data.accepted;
    })
    .finally(() => {
        window.location.reload()
  });  }
  const removeTask = async (id)=>{
    await WorkService.removeTask(token, id)
    .then((data) => {
      accepted= data.accepted;
    })
    .finally(() => {
        window.location.reload()
  });  }

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {name}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {description}
            </Typography>
            { accepted && (<div> Accepted task</div>)}
            { !accepted && (<div> Not Accepted task</div>)}
            <Typography variant="subtitle1" paragraph>
              Date Due: {dateDue}
            </Typography>
            { !finished && (<div>Unfinished</div>)}
            { finished && (<div>Finished</div>)}
          </CardContent>
        </Card>
      </CardActionArea>
      { accepted && !finished &&  
      <button
            type="button"
            className="form-button2"
            onClick={() => finishTask(id)}> 
            Mark as finished
           </button>
}
{ !accepted &&
      <button
            type="button"
            className="form-button2"
            onClick={() => acceptTask(id)}> 
            Accept task
           </button>
}
{ finished &&
      <button
            type="button"
            className="form-button2"
            onClick={() => removeTask(id)}> 
            Remove           </button>
}
    </Grid>
  );
}

export default TaskPost;