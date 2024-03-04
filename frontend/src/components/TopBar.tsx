import "../App.css";
import { Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import SideBar from "./SideBar";

function TopBar() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box>
      <SideBar open={open} setOpen={setOpen} />
      <Box className="w-full px-3 h-[3.3rem] bg-green-500 flex justify-between items-center ">
        <Box>
          <MenuIcon onClick={() => setOpen(true)} />
        </Box>
        <Box>
          <Typography variant="h5" sx={{}}>
            To Do List
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default TopBar;
//  <p>To Do List</p>
// <DeleteOutlineIcon />;
