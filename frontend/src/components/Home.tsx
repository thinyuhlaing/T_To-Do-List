import { useEffect, useState } from "react";
import "../App.css";
import { Box } from "@mui/material";
import ListBox from "./ListBox";
import NoteDialog from "./NoteDialog";
import Layout from "./Layout";
import { useAppSelector } from "../store/hooks";

export interface Note {
  id: string;
  label: string;
  time: string;
}

const Home = () => {
  const note = useAppSelector((state) => state.note.notes);

  const [noteData, setNoteData] = useState<Note[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);

  const getNoteData = async () => {
    const response = await fetch("http://localhost:5000", { method: "GET" });
    const data = await response.json(); // Parse JSON data
    setNoteData(data);
  };

  useEffect(() => {
    if (!openDialog) {
      getNoteData();
    }
  }, [openDialog]);

  useEffect(() => {
    if (!editDialog) {
      getNoteData();
    }
  }, [editDialog]);

  const handleDeleteNote = () => {
    // After deleting a note, fetch the updated note data
    getNoteData();
  };

  return (
    <Layout title={"To Do List"}>
      <Box className="mx-3">
        {noteData.map((item, index) => (
          <ListBox
            key={index}
            id={item.id}
            label={item.label}
            time={item.time}
            onDeleteNote={handleDeleteNote}
            editDialog={editDialog}
            setEditDialog={setEditDialog}
          />
        ))}
      </Box>

      <NoteDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </Layout>
  );
};

export default Home;
