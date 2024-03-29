import "../App.css";
import { Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { ReactNode } from "react";
import SideBar from "./SideBar";

interface Props {
  children?: ReactNode;
}

function TopBar({ children }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Box className="topBar">
      <SideBar open={open} setOpen={setOpen} />
      <Box className="w-full px-3 h-[3.3rem] bg-[#33186B] flex justify-between items-center ">
        <Box>
          <MenuIcon onClick={() => setOpen(true)} className="text-white" />
        </Box>
        <Box>
          <Typography variant="h5" className="text-white">
            {children}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default TopBar;
//  <p>To Do List</p>
// <DeleteOutlineIcon />;
