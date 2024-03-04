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
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNote from "./components/CreateNote";
import TopBar from "./components/TopBar";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "./components/SideBar";
import Layout from "./components/Layout";

export interface Note {
  id: number;
  label: string;
  time: string;
}

const App = () => {
  const [noteData, setNoteData] = useState<Note[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  const getNoteData = async () => {
    const response = await fetch("http://localhost:5000", { method: "GET" });
    const data = await response.json(); // Parse JSON data
    setNoteData(data);
    console.log("getnote data rendering ");
  };

  useEffect(() => {
    if (!openDialog) {
      getNoteData();
    }
  }, [openDialog]);

  console.log("App rendering...");

  const handleDeleteNote = () => {
    // After deleting a note, fetch the updated note data
    getNoteData();
  };

  return (
    <Layout>
      <Box className="container">
        <Box className="bg-purple-500 mx-3">
          {noteData.map((item, index) => (
            <ListBox
              key={index}
              id={index}
              label={item.label}
              time={item.time}
              onDeleteNote={handleDeleteNote}
            />
          ))}
        </Box>

        <CreateNote openDialog={openDialog} setOpenDialog={setOpenDialog} />
      </Box>
    </Layout>
  );
};

export default App;
