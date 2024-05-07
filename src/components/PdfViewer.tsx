import { PDFPageProxy } from "pdfjs-dist/types/display/api";
import { useEffect, useState } from "react";
// import { useAddPage } from "../utils/uploadFile";
import useGetPages from "../hooks/useGetPages";
import PageBox from "./PageBox";

interface Props {
  file: string;
  addPage: Function;
}

function PdfViewer({ file, addPage }: Props) {
  const [pages, setPages] = useState<PDFPageProxy[]>([]);
  // const { addPage } = useAddPage();

  useEffect(() => {
    (async () => {
      const collection = await useGetPages(file);
      setPages(collection);
    })();
    return () => {
      setPages([]);
    };
  }, [file]);

  return (
    <div>
      <div className="flex gap-5 p-4 flex-wrap justify-center">
        {pages.length > 0 &&
          pages.map((page: any, idx: number) => (
            <div
              key={idx}
              className="flex items-center justify-center flex-col"
            >
              <PageBox page={page} idx={idx} onClickHandler={addPage} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default PdfViewer;
