// import { useState, useEffect } from "react";
// import TaskPost from "../../../../pages/Work/TaskPost";
// import Scroll from "react-scroll-component"

// const TaskInfo = ({taskList}) => {
//   const [tasks, setTasks] = useState([]);
//   return (
//     <div className="taskGrid">
//       <div className="jumbotron">
//         <h1 className="display-4">Tasks</h1>
//       </div>
//       <div className="">
//        {(taskList).map((task) => {
//         return <TaskPost
//                 id={task.id} name={task.name} priority={task.priority}
//                 description={task.description} finished={task.finished}
//                  dateDue={task.dateDue} dateCreated={task.dateCreated} accepted={task.accepted}
//                 ></TaskPost>;})}
//         </div>
//     </div>
//   );
// };
// export default TaskInfo;
import { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { useDebounce } from "../../../../hooks/useDebounce";
import TaskPost from "../../../../pages/Work/TaskPost";
import Scroll from "react-scroll-component"

const TaskInfo = ({taskList}) => {
  const [tasks, setTasks] = useState([]);
const arrayChunk = (arr, n) => {
  const array = arr.slice();
  const chunks = [];
  while (array.length) chunks.push(array.splice(0, n));
  console.log(chunks)
  return chunks;
};
  return (
    <Scroll   direction="vertical" height={`480px`} scrollerClass={"scroller"}>
    <div className="taskContainer">
     <div className="jumbotron">
        <h2 className="display-4">Tasks</h2>
      </div>
      <div className="companyGrid2">
      { taskList.map((task)=>{
            return <div className="company-item"><TaskPost
            id={task.id} name={task.name} priority={task.priority}
                description={task.description} finished={task.finished}
                 dateDue={task.dateDue} dateCreated={task.dateCreated} accepted={task.accepted}
             ></TaskPost></div>
          })}
    </div></div></Scroll>
  );
};

export default TaskInfo;
