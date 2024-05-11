import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import route from "./routes";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(route);

app.get("/", (_, res) => {
  res.json({ msg: "welcome to my pdf editro server" });
});

const server = app.listen(5759, () => {
  console.log("welcome to pdfeditor server!");
});

process.on("SIGINT", () => {
  console.log("stopping server ...");
  server.close();
  process.exit(0);
});
