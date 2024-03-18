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
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { useDispatch } from "react-redux";
import { Note } from "./Home";

interface Props {
  id: string;
  task: string;
  time: string;
  editDialog: boolean;
  setEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppEdit = ({ id, task, time, editDialog, setEditDialog }: Props) => {
  const [note, setNote] = useState<Note>({
    id: id,
    task: task,
    time: time,
  });

  const editData = async () => {
    const response = await fetch("http://localhost:5000/edit", {
      headers: {
        "content-type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(note),
    });
    console.log(note);
    setEditDialog(false);
  };

  console.log(note);
  return (
    <Box>
      <Box>
        <EditIcon onClick={() => setEditDialog(false)} />
      </Box>
      <Dialog open={editDialog} className="">
        <DialogTitle className="dialogTitle">
          <ArrowBackIcon
            onClick={() => setEditDialog(false)}
            className="arrowIcon"
          />
          Edit
        </DialogTitle>
        <List className={"createListBox"} sx={{ p: "20px" }}>
          <Typography sx={{ mb: "0.5rem" }}>Task</Typography>
          <Textarea
            color="primary"
            minRows={3}
            placeholder="Type something..."
            variant="soft"
            defaultValue={task}
            onChange={(event) =>
              setNote({ ...note, task: event.target.value })
            }
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
            onClick={() => setEditDialog(false)}
            className=" button"
          >
            cancel
          </Button>
          <Button onClick={editData} variant="contained" className="button">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default AppEdit;
