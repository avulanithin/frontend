import { AppBar, Toolbar, Typography } from "@mui/material";

const TopBar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6">
          AI Executive Secretary
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
