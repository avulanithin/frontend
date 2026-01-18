import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

const AppLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <TopBar />
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
