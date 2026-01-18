import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 220,
        [`& .MuiDrawer-paper`]: { width: 220, boxSizing: "border-box" },
      }}
    >
      <List>
        <ListItemButton onClick={() => navigate("/")}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/emails")}>
          <ListItemText primary="Emails" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/tasks")}>
          <ListItemText primary="Tasks" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/calendar")}>
          <ListItemText primary="Calendar" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
