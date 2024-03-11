import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Finished from "@mui/icons-material/Check";
import { ReactNode, useEffect, useState } from "react";
import { Note } from "../App";
import DeleteIcon from "@mui/icons-material/Delete";
import { text } from "stream/consumers";
import RestoreIcon from "@mui/icons-material/Restore";
export interface Props {
  id: number;
  label: string;
  time: string;
  onDeleteNote: () => void;
}
const TrashBox = ({ id, label, time, onDeleteNote }: Props) => {
  const note = { id: id, label: label, time: time };

  const DeleteNote = async () => {
    const response = await fetch("http://localhost:5000/trash", {
      headers: {
        "content-type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify(note),
    });
    onDeleteNote();
  };

  return (
    <Box className={"clicked"}>
      <Box className={"clickedlistBox"}>
        <Box className={"mark"}>
          <RestoreIcon />
        </Box>
        <Box className={"clickedbody"}>
          <Box>
            <Typography variant="h5">{label}</Typography>
            <Typography variant="body1">{time}</Typography>
          </Box>
        </Box>
      </Box>
      <Box className={"deleteIcon"}>
        <DeleteIcon onClick={DeleteNote} />
      </Box>
    </Box>
  );
};

export default TrashBox;
