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
import { Note } from "../App";
import { useAppDispatch } from "../store/hooks";
import { addNote, createNote } from "../store/slices/noteSlice";

interface CreateNoteProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const NoteDialog = ({ openDialog, setOpenDialog }: CreateNoteProps) => {
  const dispatch = useAppDispatch();
  const [note, setNote] = useState<Note>({
    label: "",
    time: "",
  });

  const sendNoteData = async () => {
    setOpenDialog(false);
    dispatch(createNote(note));
    dispatch(addNote(note));
  };

  const caaa = () => {
    setNote({ label: "", time: "" });
    setOpenDialog(true);
  };
  return (
    <Box>
      <div className="addIcon" onClick={caaa}>
        + Add
      </div>
      <Dialog open={openDialog} className="">
        <DialogTitle className="w-full h-full bg-slate-200 text-black">
          <ArrowBackIcon
            onClick={() => setOpenDialog(false)}
            className=" text-white bg-[#33186B] mr-3 -ml-4 rounded-md"
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
            onChange={(event) =>
              setNote({ ...note, label: event.target.value })
            }
          />
        </List>
        <Divider />
        <List className={"createListBox"} sx={{ p: "20px" }}>
          <Typography sx={{ mb: "0.5rem" }}> Time</Typography>
          <Box className="bg-[#E3EFFB] rounded-lg pl-3 py-2 ">
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
            disabled={!note.label}
            variant="contained"
            onClick={sendNoteData}
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
