import { PDFDocument, PDFObject } from "pdf-lib";
import { type Buff } from "./types";

const removePage = async (buff: Buff, pages = []) => {
  const pdf = await PDFDocument.load(buff);
  for (let i = 0; i < pages.length; i++) {
    pdf.removePage(pages[i] - i);
  }

  const bytes = await pdf.save();
  return bytes;
};

export default removePage;
