import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Finished from "@mui/icons-material/Check";
import { ReactNode, useEffect, useState } from "react";
import { Note } from "../App";
import DeleteIcon from "@mui/icons-material/Delete";
import { text } from "stream/consumers";
import { wrap } from "module";
import AppEdit from "./AppEdit";

export interface ListBoxProps {
  id: number;
  label: string;
  time: string;
  onDeleteNote: () => void;
  editDialog: boolean;
  setEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListBox = ({
  id,
  label,
  time,
  onDeleteNote,
  editDialog,
  setEditDialog,
}: ListBoxProps) => {
  const [close, setClose] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [idNum, setIdNum] = useState<number>(0);
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
  const note = { id: id, label: label, time: time };

  const DeleteNote = async () => {
    const response = await fetch("http://localhost:5000/", {
      headers: {
        "content-type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify(note),
    });
    onDeleteNote();
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
              sx={{ overflow: "hidden" }}
              variant="h5"
              className={close ? "line-through" : "Hello"}
            >
              {label}
            </Typography>
            <Typography variant="body1">{time}</Typography>
          </Box>
        </Box>

        <Box className={"editIcon"}>
          <AppEdit
            id={id}
            label={label}
            time={time}
            editDialog={editDialog}
            setEditDialog={setEditDialog}
          />
        </Box>
      </Box>
      <Box className={isClicked ? "deleteIcon" : ""}>
        {isClicked ? <DeleteIcon onClick={DeleteNote} /> : ""}
      </Box>
    </Box>
  );
};

export default ListBox;
