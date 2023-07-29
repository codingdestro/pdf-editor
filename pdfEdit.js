import { PDFDocument } from "pdf-lib";

export const removePages = async (buff, pages = []) => {
  const pdf = await PDFDocument.load(buff);
  for (let i = 0; i < pages.length; i++) {
    pdf.removePage(pages[i] - i);
  }
  const bytes = await pdf.save();
  return bytes;
};

export const extractPages = async (buff, pages = []) => {
  const pdfDoc = await PDFDocument.load(buff);
  const newpdf = await PDFDocument.create();
  pages = await newpdf.copyPages(pdfDoc, pages);
  for (let i = 0; i < pages.length; i++) {
    newpdf.addPage(pages[i]);
  }
  const bytes = await newpdf.save();
  return bytes;
};

export const mergePdf = async (buff1, buff2) => {
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

export const addFromAnother = async (pdf, toAdd = []) => {
  const newPdf = await PDFDocument.load(file2);
  const pages = await newPdf.copyPages(pdf, toAdd);

  for (let i = 0; i < toAdd.length; i++) {
    newPdf.addPage(pages[i]);
  }
  return await newPdf.save();
};
