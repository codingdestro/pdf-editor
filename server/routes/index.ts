import { Router, type Request, type Response } from "express";
import { getFileBuffer } from "../middleware/handlerFileBuffer";
import extractPage from "../utils/extractPage";
import removePage from "../utils/removePage";

const route = Router();

const download = (res: Response) => {
  res.header("Content-Type", "application/pdf");
  res.header("Content-Disposition", "attacment;filename=");
  return res;
};

route.post(
  "/pages/extract",
  getFileBuffer,
  async (req: Request, res: Response) => {
    let { files, pages } = req.body;
    const buff = Buffer.concat(files["pdf"]);
    const file = await extractPage(buff, pages);
    res = download(res);
    res.end(file);
  },
);

route.post(
  "/pages/delete",
  getFileBuffer,
  async (req: Request, res: Response) => {
    let { files, pages } = req.body;
    const buff = Buffer.concat(files["pdf"]);
    const file = await removePage(buff, pages);
    res = download(res);
    res.end(file);
  },
);

export default route;
