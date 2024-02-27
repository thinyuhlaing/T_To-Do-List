import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Finished from "@mui/icons-material/Check";
import { useEffect, useState } from "react";
import { Note } from "../App";
import DeleteIcon from "@mui/icons-material/Delete";

const ListBox = ({ label, time }: Note) => {
  const [close, setClose] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState(false);

  const check = () => {
    if (close) {
      setClose(false);
    } else {
      setClose(true);
    }
  };

  const handleClick = () => {
    if (isClicked) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
  };

  return (
    <Box className={isClicked ? "clicked" : ""}>
      <Box className={isClicked ? "clickedlistBox" : "listBox"}>
        <Box onClick={check} className={"mark"}>
          {close ? <Finished /> : ""}
        </Box>
        <Box
          onClick={handleClick}
          className={isClicked ? "clickedbody" : "body"}
        >
          <Box>
            <Typography
              variant="h5"
              className={close ? "line-through" : "Hello"}
            >
              {label}
            </Typography>
            <Typography variant="body1">{time}</Typography>
          </Box>
        </Box>
        <EditIcon className={"editIcon"} />
      </Box>
      <Box className={isClicked ? "deleteIcon" : ""}>
        {isClicked ? <DeleteIcon /> : ""}
      </Box>
    </Box>
  );
};

export default ListBox;
