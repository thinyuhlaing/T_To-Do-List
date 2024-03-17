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

interface data {
  id: string;
  label: string;
  time: string;
}
interface Props {
  id: string;
  label: string;
  time: string;
  noteData: any;
  editDialog: boolean;
  setEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppEdit = ({
  id,
  label,
  time,
  noteData,
  editDialog,
  setEditDialog,
}: Props) => {
  const [edit, setEdit] = useState<{ id: string; label: string; time: string }>(
    {
      id: id,
      label: label,
      time: time,
    }
  );
  const [note, setNote] = useState<Note>({
    id: id,
    label: label,
    time: time,
  });
  const handleClick = () => {
    setEditDialog(true);
  };

  const Edit = async () => {
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
        <EditIcon onClick={handleClick} />
      </Box>
      <Dialog open={editDialog} className="">
        <DialogTitle className="w-full h-full bg-[#dfcbf3] text-black">
          <ArrowBackIcon
            onClick={() => setEditDialog(false)}
            className=" text-white bg-[#33186B] mr-3 -ml-4 rounded-md"
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
            defaultValue={label}
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
        <DialogActions className="bg-[#dfcbf3] text-black">
          <Button
            variant="outlined"
            onClick={() => setEditDialog(false)}
            className=" button"
          >
            cancel
          </Button>
          <Button onClick={Edit} variant="contained" className="button">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default AppEdit;
