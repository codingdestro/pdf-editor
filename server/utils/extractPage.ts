import { PDFDocument, PDFPage, defaultButtonAppearanceProvider } from "pdf-lib";
import { type Buff } from "./types";

const extractPage = async (buff: Buff, pages = []) => {
  const pdfDoc = await PDFDocument.load(buff);
  const newPdf = await PDFDocument.create();
  const pdfPages = await newPdf.copyPages(pdfDoc, pages);
  for (let i = 0; i < pages.length; i++) {
    newPdf.addPage(pdfPages[i]);
  }

  const bytes = await newPdf.save();
  return bytes;
};

export default extractPage;
