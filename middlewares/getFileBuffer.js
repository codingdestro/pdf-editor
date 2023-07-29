import Busboy from "busboy";

export const getFileBuffer = async (req, res, next) => {
  let files = {};
  let pages = null;

  // console.log(req.headers);
  const busboy = Busboy({ headers: req.headers });

  //handling fields
  busboy.on("field", (fieldName, val, info) => {
    if (fieldName === "pages") {
      if (!val) val = [0];
      else
        val =
          val.length === 1
            ? [parseInt(val)]
            : val.split(",").map((e) => parseInt(e));
      pages = val;
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
      req.data = {
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
