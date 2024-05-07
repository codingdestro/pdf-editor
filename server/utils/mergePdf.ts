import { PDFDocument } from "pdf-lib";
import { type Buff } from "./types";
export const mergePdf = async (buff1: Buff, buff2: Buff) => {
  try {
    const pdfFirst = await PDFDocument.load(buff2);
    const newpdf = await PDFDocument.load(buff1);

    let pages = new Array(pdfFirst.getPages().length);

    for (let i = 0; i < pages.length; i++) {
      pages[i] = i;
    }
    pages = await newpdf.copyPages(pdfFirst, pages);

    for (let i = 0; i < pages.length; i++) {
      newpdf.addPage(pages[i]);
    }
    const bytes = await newpdf.save();
    return bytes;
  } catch (err) {
    console.log(err);
    return "something went wrong!";
  }
};
