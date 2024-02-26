import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  List,
  DialogActions,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ListBox from "./components/ListBox";
import { Textarea } from "@mui/joy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export interface Note {
  label: string;
  time: string;
}

const App = () => {
  const [noteData, setNoteData] = useState<Note[]>([]);
  const [note, setNote] = useState<Note>({ label: "", time: "" });
  const [openDialog, setOpenDialog] = useState(false);
  console.log(noteData);

  const getNoteData = async () => {
    const response = await fetch("http://localhost:5000", { method: "GET" });
    const data = await response.json(); // Parse JSON data
    setNoteData(data);
    console.log(noteData);
  };

  useEffect(() => {
    getNoteData();
  }, [openDialog]);

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
    <Box className="container">
      <Box className="bg-green-500 mb-3 flex justify-between items-center ">
        <Typography variant="h5">To Do List</Typography>
        <Box className="flex">
          <p>To Do List</p>
          <DeleteOutlineIcon />
        </Box>
      </Box>
      <Box className="bg-purple-500">
        {noteData.map((item, index) => (
          <ListBox key={index} label={item.label} time={item.time} />
        ))}
      </Box>

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
              onChange={(event) =>
                setNote({ ...note, time: event.target.value })
              }
            />
          </List>
          <DialogActions>
            <Button variant="contained" onClick={sendNotedata}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default App;
