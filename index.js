import express from "express";
import { createServer } from "http";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/index.js";
const app = express();

const server = createServer(app);

app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);


app.get('/',(req,res)=>{
  res.status(200).end('this is a text message')
})

server.listen(8080, () => {
  console.log("server is running...");
});
