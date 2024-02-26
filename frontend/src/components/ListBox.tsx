import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Finished from "@mui/icons-material/Check";
import { useEffect, useState } from "react";
import { Note } from "../App";
const ListBox = ({ label, time }: Note) => {
  const [close, setClose] = useState<boolean>(false);

  const check = () => {
    if (close) {
      setClose(false);
    } else {
      setClose(true);
    }
  };

  return (
    <Box className="flex mb-5  rounded-2xl border-4 px-2 py-3 justify-between items-center">
      <Box className="rounded-md border-4 w-8 h-8 bg-blue-400 " onClick={check}>
        {close ? <Finished /> : ""}
      </Box>
      <Box className="bg-yellow-300 w-80 flex justify-between items-center">
        <Box>
          <Typography variant="h4" className={close ? "line-through" : "Hello"}>
            {label}
          </Typography>
          <Typography>{time}</Typography>
        </Box>
        <EditIcon className="bg-red-300" />
      </Box>
    </Box>
  );
};

export default ListBox;
