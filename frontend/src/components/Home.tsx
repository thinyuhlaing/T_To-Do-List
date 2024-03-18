import { useEffect, useState } from "react";
import "../App.css";
import { Box } from "@mui/material";
import ListBox from "./ListBox";
import NoteDialog from "./NoteDialog";
import Layout from "./Layout";
import { useAppSelector } from "../store/hooks";

export interface Note {
  id: string;
  task: string;
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
    if (!openDialog || !editDialog) {
      getNoteData();
      console.log("GET NOTE DATA 1");
    }
  }, [openDialog, editDialog]);

  return (
    <Layout title={"To Do List"}>
      <Box className="mx-3">
        {noteData.map((item, index) => (
          <ListBox
            key={index}
            id={item.id}
            task={item.task}
            time={item.time}
            onDeleteNote={getNoteData}
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
