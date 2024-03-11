import { Box } from "@mui/material";
import { ReactNode } from "react";
import TopBar from "./TopBar";

interface Props {
  children?: ReactNode;
  title: string;
}

const Layout = ({ children, title }: Props) => {
  return (
    <Box className="layout">
      <TopBar> {title}</TopBar>
      <Box className="container"> {children}</Box>
    </Box>
  );
};

export default Layout;

//  <p>To Do List</p>
// <DeleteOutlineIcon />;
