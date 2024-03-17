import {
  Dialog,
  Box,
  DialogTitle,
  List,
  ListItemText,
  Typography,
  ListItemButton,
  Button,
  DialogActions,
} from "@mui/material";

import Textarea from "@mui/joy/Textarea";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { Note } from "../App";
import { Label } from "@mui/icons-material";

const CreateNote = () => {
  const [note, setNote] = useState<Note>({ label: "", time: "" });
  const [openDialog, setOpenDialog] = useState(false);

  const sendNotedata = async () => {
    const response = await fetch("http://localhost:5000/", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(note),
    });
    setOpenDialog(false);
  };

  return (
    <Box className="bg-black">
      <div className="boxIcon" onClick={() => setOpenDialog(true)}>
        + Add
      </div>
      <Dialog open={openDialog}>
        <DialogTitle sx={{ backgroundColor: "yellow" }}>
          <ArrowBackIcon
            onClick={() => setOpenDialog(false)}
            className=" text-white bg-blue-400 mr-3 -ml-4 rounded-md"
          />
          Add Task
        </DialogTitle>
        <List className="bg-blue-500 w-90 " sx={{ p: "20px" }}>
          <Typography>Label</Typography>
          <Textarea
            color="primary"
            minRows={3}
            placeholder="Type something..."
            variant="soft"
            onChange={(event) =>
              setNote({ ...note, label: event.target.value })
            }
          />
        </List>
        <List className="bg-green-500 w-90 " sx={{ p: "20px" }}>
          <Typography> Time</Typography>
          <Textarea
            color="primary"
            minRows={2}
            placeholder="e.g, 6pm to 7pm"
            variant="soft"
            onChange={(event) => setNote({ ...note, time: event.target.value })}
          />
        </List>
        <DialogActions>
          <Button variant="contained" onClick={sendNotedata}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// className="w-10/12 mx-auto my-2"
