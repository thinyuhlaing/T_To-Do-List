import { Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";

export interface Props {
  id: string;
  task: string;
  time: string;
  onDeleteNote: () => void;
}
const TrashBox = ({ id, task, time, onDeleteNote }: Props) => {
  const note = { id: id, task: task, time: time };

  const rebackData = async () => {
    const response = await fetch("http://localhost:5000/trash", {
      headers: {
        "content-type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(note),
    });
    onDeleteNote(); // Assuming you're expecting JSON response
  };

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
          <RestoreIcon onClick={rebackData} />
        </Box>
        <Box className={"clickedbody"}>
          <Box>
            <Typography variant="h5">{task}</Typography>
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
