import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base/MenuButton";
import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem";
import { useState } from "react";

const DropdownMenu = () => {
  const [tasks, setTasks] = useState(["task1", "task2"]);

  return (
    <Dropdown>
      <MenuButton>My account</MenuButton>
      <Menu slots={{ task: tasks }}>
        <MenuItem onClick={console.log("click")}>Profile</MenuItem>
        <MenuItem onClick={console.log("click")}>Language settings</MenuItem>
        <MenuItem onClick={console.log("click")}>Log out</MenuItem>
      </Menu>
    </Dropdown>
  );
};
export default DropdownMenu;
