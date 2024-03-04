import "../App.css";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function SideBar({ open, setOpen }: Props) {
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <Drawer open={open} onClose={toggleDrawer(false)} className="w-full">
      <Box
        sx={{ height: "100vh", width: 100, bgcolor: "#1B9C85" }}
        role="presentation"
        onClick={toggleDrawer(false)}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ mr: "-20px", ml: "-8px" }}>
                <DeleteOutlineIcon />
              </ListItemIcon>
              <ListItemText primary={"trash"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default SideBar;

{
  /* <Box
  sx={{ height: "100%", width: 100, bgcolor: "#1B9C85" }}
  role="presentation"
  onClick={toggleDrawer(false)}
>
  <List>
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon sx={{ mr: "-20px", ml: "-8px" }}>
          <DeleteOutlineIcon />
        </ListItemIcon>
        <ListItemText primary={"trash"} />
      </ListItemButton>
    </ListItem>
  </List>
</Box>; */
}
