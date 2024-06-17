import { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import WorkService from "../../../../api/WorkService";
import { useDebounce } from "../../../../hooks/useDebounce";


const TaskInfo = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useAuth();
  const id = useState(6);
  const fetchData = async () => {
    const list= await WorkService.getTasksForUser(token, id)
    console.log("tasklist "+list)
    setTasks(list);
    return list;
   };
  useEffect(() => {
    setIsLoading(true);
  }, []);
  useDebounce(
    async () => {
      try {
        const tasks = await fetchData(token, id);
        setTasks(tasks);
        console.log("TASKS ARE: " + tasks)
      } catch (error) {
        console.log(error);
      }
    },
    800,
    [isLoading]
  );

  return (
    <div className="taskContainer">
      <div className="jumbotron">
        <h1 className="display-4">Tasks</h1>
      </div>
      {console.log(tasks)}
      {tasks.map((task) => (
        <div className="card" key={task.id}>
          <div className="card-header">
            #{task.id} {task.name}
          </div>
          <div className="card-body">
            <p className="card-text">{task.priority}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TaskInfo;
