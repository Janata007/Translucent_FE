import { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import WorkService from "../../../../api/WorkService";
import { useDebounce } from "../../../../hooks/useDebounce";
import TaskPost from "../../../../pages/Work/TaskPost";
import Scroll from "react-scroll-component"


const TaskInfo = ({taskList}) => {
  console.log(taskList)
  const [tasks, setTasks] = useState([{
    "id": 9,
    "name": "Task01",
    "priority": "MEDIUM",
    "description": "task for jim",
    "finished": false,
    "arrangementId": null,
    "createdByUserId": 2,
    "createdForUserId": 6,
    "dateDue": "2024-10-05T11:59:11.332",
    "dateCreated": "2024-06-17T16:56:10.645824",
    "accepted": false
}]);
const arrayChunk = (arr, n) => {
  const array = arr.slice();
  const chunks = [];
  while (array.length) chunks.push(array.splice(0, n));
  console.log(chunks)
  return chunks;
};
  return (
    <Scroll   direction="vertical"
    height={`550px`}
    scrollerClass={"scroller"}>
    <div className="taskContainer">
      <div className="jumbotron">
        <h1 className="display-4">Tasks</h1>
      </div>
      { arrayChunk(taskList, 3).map((items, index) => {
        return (
          <div className="taskGrid">
            {items.map((task, sIndex) => {
              return <div className="task-item"> {<TaskPost
                id={task.id}
                name={task.name}
                priority={task.priority}
                description={task.description}
                finished={task.finished}
                 dateDue={task.dateDue}
                 dateCreated={task.dateCreated} accepted={task.accepted}
                ></TaskPost>}
           </div>;
            })}</div>
            );})}
    </div></Scroll>
  );
};
export default TaskInfo;
