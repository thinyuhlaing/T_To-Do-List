import express, { Request, Response } from "express";
import fs from "fs";
import cors from "cors";
import nanoid from "nanoid";

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());

let oldData: { id?: string; label: string; time: string }[] = [];
let oldTrashData: { id?: string; label: string; time: string }[] = [];
try {
  const userData = fs.readFileSync("./data/data.json", "utf-8");
  oldData = JSON.parse(userData);

  const trashUserData = fs.readFileSync("./data/trash.json", "utf-8");
  oldTrashData = JSON.parse(trashUserData);
} catch (error) {
  oldData = [];
  oldTrashData = [];
}
app.get("/", (req: Request, res: Response) => {
  const data = fs.readFileSync("./data/data.json");
  res.send(data);
});

app.get("/trash", (req: Request, res: Response) => {
  const data = fs.readFileSync("./data/trash.json");
  res.send(data);
});

app.post("/", (req: Request, res: Response) => {
  const { label, time } = req.body;
  const id = nanoid.nanoid();

  const newData: { id: string; label: string; time: string } = {
    id,
    label,
    time,
  };
  oldData.push(newData);
  fs.writeFileSync("./data/data.json", JSON.stringify(oldData, null, 2));

  res.end();
});

app.post("/trash", (req: Request, res: Response) => {
  const { label, time }: { label: string; time: string } = req.body;
  // post
  const newData = { label, time };
  oldData.push(newData);
  fs.writeFileSync("./data/data.json", JSON.stringify(oldData, null, 2));

  res.end();
  // delete
  const data = oldTrashData.find((item) => item.label === label); // check

  if (!data) {
    res.status(404).json({ error: "Data not found" });
    return;
  }
  const deleteIndex = oldTrashData.findIndex((item) => item.label === label);
  oldTrashData.splice(deleteIndex, 1);
  fs.writeFileSync("./data/trash.json", JSON.stringify(oldTrashData, null, 2));
});

app.delete("/", (req: Request, res: Response) => {
  // deleteData

  const { id, label, time }: { id: string; label: string; time: string } =
    req.body;

  const data = oldData.find((item) => item.label === label); // check

  console.log("server :", data);
  if (!data) {
    res.status(404).json({ error: "Data not found" });
    return;
  }
  const deleteIndex = oldData.findIndex((item) => item.label === label);
  oldData.splice(deleteIndex, 1);
  fs.writeFileSync("./data/data.json", JSON.stringify(oldData, null, 2));

  // trashData

  const trashData = { id, label, time };
  oldTrashData.push(trashData);
  fs.writeFileSync("./data/trash.json", JSON.stringify(oldTrashData, null, 2));
  res.end();
});

app.delete("/trash", (req: Request, res: Response) => {
  // deleteData
  const { label, time }: { label: string; time: string } = req.body;

  const deleteIndex = oldTrashData.findIndex((item) => item.label === label);
  oldTrashData.splice(deleteIndex, 1);
  fs.writeFileSync("./data/trash.json", JSON.stringify(oldTrashData, null, 2));

  res.end();
});

app.put("/edit", (req: Request, res: Response) => {
  const { id, label, time } = req.body;
  const index = oldData.findIndex((item) => item.id === id);
  oldData[index].label = label;
  oldData[index].time = time;

  fs.writeFileSync("./data/data.json", JSON.stringify(oldData, null, 2));
  console.log("Data updated:", oldData[index]);

  res.end();
});

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
// app.post("/", (req: Request, res: Response) => {
//   const data = fs.readFileSync("data.json");
//   req.body
// });
