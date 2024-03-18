import {
  Dialog,
  Box,
  DialogTitle,
  List,
  Typography,
  Button,
  DialogActions,
  Divider,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Textarea from "@mui/joy/Textarea";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro";
import { useAppDispatch } from "../store/hooks";
import { addNote, createNote } from "../store/slices/noteSlice";
import { Note } from "./types/types";

interface CreateNoteProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const NoteDialog = ({ openDialog, setOpenDialog }: CreateNoteProps) => {
  const [note, setNote] = useState<Note>({
    task: "",
    time: "",
  });

  const createNoteData = async () => {
    const response = await fetch("http://localhost:5000/", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(note),
    });
    setOpenDialog(false);
  };

  const handleClick = () => {
    setNote({ task: "", time: "" });
    setOpenDialog(true);
  };
  return (
    <Box>
      <div className="addButton" onClick={handleClick}>
        + Add
      </div>
      <Dialog open={openDialog} className="">
        <DialogTitle className="dialogTitle">
          <ArrowBackIcon
            onClick={() => setOpenDialog(false)}
            className="arrowIcon"
          />
          Add Task
        </DialogTitle>
        <List className={"createListBox"} sx={{ p: "20px" }}>
          <Typography sx={{ mb: "0.5rem" }}>Task</Typography>
          <Textarea
            color="primary"
            minRows={3}
            placeholder="Type something..."
            variant="soft"
            onChange={(event) => setNote({ ...note, task: event.target.value })}
          />
        </List>
        <Divider />
        <List className={"createListBox"} sx={{ p: "20px" }}>
          <Typography sx={{ mb: "0.5rem" }}> Time</Typography>
          <Box className="timeList">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  "MultiInputTimeRangeField",
                  "SingleInputTimeRangeField",
                ]}
              >
                <MultiInputTimeRangeField
                  className="w-[16rem] "
                  slotProps={{
                    textField: ({ position }) => ({
                      label: position === "start" ? "From" : "To",
                    }),
                  }}
                  onChange={(values: any) => {
                    try {
                      const formattedValues = values.map((value: any) =>
                        value.$d.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                      );
                      setNote({ ...note, time: formattedValues.join(" - ") });
                    } catch (err) {
                      console.log("Invalid Date");
                    }
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </List>
        <DialogActions className="bg-slate-200 text-black">
          <Button
            variant="outlined"
            onClick={() => setOpenDialog(false)}
            className=" button"
          >
            cancel
          </Button>
          <Button
            disabled={!note.task}
            variant="contained"
            onClick={createNoteData}
            className="button"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NoteDialog;
// className="w-10/12 mx-auto my-2"
