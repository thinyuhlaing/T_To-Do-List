import express, { Request, Response } from "express";
import fs from "fs";
import cors from "cors";
import nanoid from "nanoid";

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());

export interface Note {
  id: string;
  task: string;
  time: string;
}

let oldData: Note[] = [];
let oldTrashData: Note[] = [];
try {
  const userData = fs.readFileSync("./data/data.json", "utf-8"); // "utf-8" --> change into string
  oldData = JSON.parse(userData);

  const trashUserData = fs.readFileSync("./data/trash.json", "utf-8");
  oldTrashData = JSON.parse(trashUserData);
} catch (error) {
  oldData = [];
  oldTrashData = [];
}

app.post("/", (req: Request, res: Response) => {
  const { task, time } = req.body;
  const id = nanoid.nanoid();

  const newData: Note = {
    id,
    task,
    time,
  };
  oldData.push(newData);
  fs.writeFileSync("./data/data.json", JSON.stringify(oldData, null, 2));

  res.end();
}); // createNoteData

app.get("/", (req: Request, res: Response) => {
  res.send(oldData);
}); // sendNoteData

app.get("/trash", (req: Request, res: Response) => {
  const data = fs.readFileSync("./data/trash.json");
  res.send(data);
}); // sendTrashData

app.put("/trash", (req: Request, res: Response) => {
  const { id, task, time }: Note = req.body;

  // post
  const newData = { id, task, time };
  oldData.push(newData);
  fs.writeFileSync("./data/data.json", JSON.stringify(oldData, null, 2));

  // delete
  const checkId = oldTrashData.find((item) => item.id === id); // check

  if (checkId) {
    // if have find index and delete it
    const deleteIndex = oldTrashData.findIndex((item) => item.id === id);
    oldTrashData.splice(deleteIndex, 1);
    fs.writeFileSync(
      "./data/trash.json",
      JSON.stringify(oldTrashData, null, 2)
    );
  } else {
    // if there's haven't just return
    res.status(404).json({ error: "Data not found" });
    return;
  }

  res.end();
}); // deleteTrashData and noteDataCreate

app.delete("/", (req: Request, res: Response) => {
  const { id, task, time }: Note = req.body;

  // PosttrashData

  const trashData = { id, task, time };
  oldTrashData.push(trashData);
  fs.writeFileSync("./data/trash.json", JSON.stringify(oldTrashData, null, 2));

  // deleteData

  const checkId = oldData.find((item) => item.id === id); // check there is has or not

  if (checkId) {
    // if have find index and delete it
    const deleteIndex = oldData.findIndex((item) => item.id === id);
    oldData.splice(deleteIndex, 1);
    fs.writeFileSync("./data/data.json", JSON.stringify(oldData, null, 2));
  } else {
    // if there's haven't just return
    res.status(404).json({ error: "Data not found" });
    return;
  }

  res.end();
}); // PosttrashData and deleteNoteData

app.delete("/trash", (req: Request, res: Response) => {
  // deleteData
  const { id }: Note = req.body;

  const checkId = oldTrashData.find((item) => item.id === id); // check
  if (checkId) {
    const deleteIndex = oldTrashData.findIndex((item) => item.id === id);
    oldTrashData.splice(deleteIndex, 1);
    fs.writeFileSync(
      "./data/trash.json",
      JSON.stringify(oldTrashData, null, 2)
    );
  } else {
    res.status(404).json({ error: "Data not found" });
    return;
  }

  res.end();
}); // deleteTrashData

app.put("/edit", (req: Request, res: Response) => {
  const { id, task, time } = req.body;

  const index = oldData.findIndex((item) => item.id === id);
  oldData[index].task = task;
  oldData[index].time = time;

  fs.writeFileSync("./data/data.json", JSON.stringify(oldData, null, 2));
  console.log("Data updated:", oldData[index]);

  res.end();
}); // editNoteData

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
// app.post("/", (req: Request, res: Response) => {
//   const data = fs.readFileSync("data.json");
//   req.body
// });
