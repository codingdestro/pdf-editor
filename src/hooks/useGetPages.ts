import * as pdfjs from "pdfjs-dist";
import { PDFPageProxy } from "pdfjs-dist/types/display/api";

pdfjs.GlobalWorkerOptions.workerSrc =
  " https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js";

const useGetPages = async (file: string) => {
  const loadingTask = pdfjs.getDocument(file);
  const pdf = await loadingTask.promise;
  const collection: PDFPageProxy[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    collection.push(page);
  }
  return collection;
};

export default useGetPages;
