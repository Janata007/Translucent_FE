import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base/MenuButton";
import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem";
import { useState, useEffect } from "react";
import "../pages/Home/Home.css";
import { ROUTES } from "../constants/ROUTES";
import WorkService from "../api/WorkService";
import { useAuth } from "../hooks/useAuth";
import { useDebounce } from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

const DropdownMenu = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(1);
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const fetchData2 = async () => {
    const taskList = await WorkService.getTasksForUser(token, id);
    return taskList;
  };
  useEffect(() => {
    setIsLoading(true);
  }, []);
  useDebounce(
    async () => {
      try {
        const tasks = await fetchData2(token, id);
        setTasks(tasks);
      } catch (error) {
        console.log(error);
      }
    },
    1000,
    [isLoading]
  );
  return (
    <div className="taskDropdown">
      <Dropdown>
        <MenuButton>My tasks</MenuButton>
        <Menu id="task-menu">
          {tasks.map((task) => (
            <MenuItem
              key={task.id}
              onClick={() => {
                navigate(ROUTES.TASK + task.id);
              }}>
              {task.name}
            </MenuItem>
          ))}
        </Menu>
      </Dropdown>
    </div>
  );
};
export default DropdownMenu;
