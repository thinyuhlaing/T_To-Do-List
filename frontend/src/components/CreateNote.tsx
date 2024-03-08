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

interface CreateNoteProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateNote = ({ openDialog, setOpenDialog }: CreateNoteProps) => {
  const [note, setNote] = useState<Note>({
    label: "",
    time: "",
  });

  const sendNoteData = async () => {
    const response = await fetch("http://localhost:5000/", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",

      body: JSON.stringify(note),
    });
    setOpenDialog(false);
    console.log("CreatNote rendering ");
  };
  console.log(note);
  return (
    <Box>
      <div className="addIcon" onClick={() => setOpenDialog(true)}>
        + Add
      </div>
      <Dialog open={openDialog} className="">
        <DialogTitle className="w-full h-full">
          <ArrowBackIcon
            onClick={() => setOpenDialog(false)}
            className=" text-white bg-blue-400 mr-3 -ml-4 rounded-md"
          />
          Add Task
        </DialogTitle>
        <List className="bg-[#33186B] w-[20rem] text-white" sx={{ p: "20px" }}>
          <Typography sx={{ mb: "0.5rem" }}>Label</Typography>
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
        <List
          className="bg-[#33186B]  w-[20rem] text-white "
          sx={{ p: "20px" }}
        >
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
                  className="w-[16rem]"
                  slotProps={{
                    textField: ({ position }) => ({
                      label: position === "start" ? "From" : "To",
                    }),
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </List>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setOpenDialog(false)}
            className=" button"
          >
            cancel
          </Button>
          <Button
            disabled={true}
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

export default CreateNote;
// className="w-10/12 mx-auto my-2"
