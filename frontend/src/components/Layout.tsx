import { Box } from "@mui/material";
import { ReactNode } from "react";
import TopBar from "./TopBar";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Box className="layout">
      <TopBar />
      <Box className="container"> {children}</Box>
    </Box>
  );
};

export default Layout;

//  <p>To Do List</p>
// <DeleteOutlineIcon />;
