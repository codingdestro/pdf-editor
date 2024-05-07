import type { Request, Response, NextFunction } from "express";
import Busboy from "busboy";

export const getFileBuffer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let files: { [key: string]: unknown[] };
  let pages: unknown = null;

  // console.log(req.headers);
  const busboy = Busboy({ headers: req.headers });

  //handling fields
  busboy.on("field", (fieldName: string, val: string, info) => {
    if (fieldName === "pages") {
      if (!val) val = "0";
      else
        pages =
          val.length === 1
            ? [parseInt(val)]
            : val.split(",").map((e) => parseInt(e));
    }
  });

  //hanling files
  busboy.on("file", (fieldName, file, info) => {
    if (info.mimeType !== "application/pdf") {
      res.send("please select pdf file");
      return;
    }

    file.on("data", (chunk) => {
      if (chunk) {
        files[fieldName] = files[fieldName] || [];
        files[fieldName].push(chunk);
      }
    });
  });

  busboy.on("finish", async () => {
    try {
      req.body = {
        files,
        pages,
      };
    } catch {
      res.end("error");
    }
  });

  busboy.on("error", () => {
    console.log("there is an error bro");
  });
  busboy.on("close", () => {
    req.unpipe(busboy);
    next();
  });
  req.pipe(busboy);
};
