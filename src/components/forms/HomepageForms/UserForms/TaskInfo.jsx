import { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import WorkService from "../../../../api/WorkService";

const TaskInfo = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useAuth();
  const id = useState(1);
  const fetchData = async () => {
    await WorkService.getTasksForUser(token, id)
      .then((data) => {
        setTasks([...data]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div className="taskContainer">
      <div className="jumbotron">
        <h1 className="display-4">Tasks</h1>
      </div>
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
