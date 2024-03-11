import { useEffect, useState } from "react";
import "../App.css";
import { Box } from "@mui/material";
import ListBox from "./ListBox";
import CreateNote from "./CreateNote";
import Layout from "./Layout";

export interface Note {
  id?: number;
  label: string;
  time: string;
}

const Home = () => {
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
            id={index}
            label={item.label}
            time={item.time}
            onDeleteNote={handleDeleteNote}
            editDialog={editDialog}
            setEditDialog={setEditDialog}
          />
        ))}
      </Box>

      <CreateNote openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </Layout>
  );
};

export default Home;
