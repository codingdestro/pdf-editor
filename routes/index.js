import { Router } from "express";
import { extractPages, removePages, mergePdf } from "../pdfEdit.js";
import { getFileBuffer } from "../middlewares/getFileBuffer.js";

const app = Router();

const download = (res) => {
  res.header("Content-Type", "application/pdf");
  res.header("Content-Disposition", `attachment; filename=`);
  return res;
};

app.post("/extractPages", getFileBuffer, async (req, res) => {
  let { files, pages } = req.data;
  files = Buffer.concat(files["pdf"]);

  const bytes = await extractPages(files, pages);
  res = download(res);
  res.end(bytes);
});

app.post("/removePages", getFileBuffer, async (req, res) => {
  let { files, pages } = req.data;
  console.log(files);
  files = Buffer.concat(files["pdf"]);
  const bytes = await removePages(files, pages);
  res = download(res);
  res.end(bytes);
});

app.post("/mergePdf", getFileBuffer, async (req, res) => {
  let buffers = req.data.files;

  for (let x in buffers) {
    buffers[x] = Buffer.concat(buffers[x]);
  }

  const bytes = await mergePdf(buffers["pdf1"], buffers["pdf2"]);
  res = download(res);
  res.end(bytes);
});

export default app;
