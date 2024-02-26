import express, { Request, Response } from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());

let oldData: { label: string; time: string }[] = [];
try {
  const userData = fs.readFileSync("data.json", "utf-8");
  oldData = JSON.parse(userData);
} catch (error) {
  oldData = [];
}
app.get("/", (req: Request, res: Response) => {
  const data = fs.readFileSync("data.json");
  res.send(data);
});

app.post("/", (req: Request, res: Response) => {
  const { label, time } = req.body;
  const newData = { label, time };
  oldData.push(newData);
  fs.writeFileSync("data.json", JSON.stringify(oldData, null, 2));

  res.end();
});

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
// app.post("/", (req: Request, res: Response) => {
//   const data = fs.readFileSync("data.json");
//   req.body
// });
