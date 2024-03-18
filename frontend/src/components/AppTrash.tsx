import { useEffect, useState } from "react";
import Layout from "./Layout";
import ListBox from "./ListBox";
import { Note } from "./Home";
import { Box } from "@mui/material";
import TrashBox from "./TrashBox";

const AppTrash = () => {
  const [noteData, setNoteData] = useState<Note[]>([]);

  const getTrashData = async () => {
    const response = await fetch("http://localhost:5000/trash", {
      method: "GET",
    });
    const data = await response.json(); // Parse JSON data
    setNoteData(data);
    console.log("getnote data rendering ");
  };

  useEffect(() => {
    getTrashData();
  }, []);

  return (
    <Layout title="Trash">
      <Box className="mx-3">
        {noteData.map((item, index) => (
          <TrashBox
            key={index}
            id={item.id}
            task={item.task}
            time={item.time}
            onDeleteNote={getTrashData} // After deleting a note, fetch the updated note data
          />
        ))}
      </Box>
    </Layout>
  );
};

export default AppTrash;
