import * as pdfjs from "pdfjs-dist";
import { PDFPageProxy } from "pdfjs-dist/types/display/api";
import { useRef, useEffect, useState } from "react";

interface Props {
  url: string;
}

function GetPdfPage({
  page,
  idx,
  onClickHandler,
}: {
  page: PDFPageProxy;
  idx: number;
  onClickHandler: Function;
}) {
  const canvaRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);

  const toggleSelected = () => {
    onClickHandler(idx);
    setSelected((prev: boolean) => !prev);
  };

  useEffect(() => {
    const renderer = async () => {
      // await setPage(page, canvaRef);
      setLoading(true);
      const viewport = page.getViewport({ scale: 0.3 });

      //get the canvas
      const canvas = canvaRef.current!;
      const ctx = canvas.getContext("2d")!;
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: ctx,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
    };
    renderer().then(() => {
      setLoading(false);
      console.log("done");
    });
  }, []);

  return (
    <div
      className={`relative flex-col flex items-center cursor-pointer`}
      onClick={toggleSelected}
    >
      {loading && <div>loading</div>}
      <div className="shadow-lg border p-1 bg-white rounded-lg ">
        <canvas ref={canvaRef} />
      </div>
      <div
        className={`${selected ? "bg-green-400" : "bg-slate-200"} w-14 h-14 flex items-center justify-center scale-50 self-center p-2 rounded-full`}
      >
        {idx}
      </div>
    </div>
  );
}

function PdfViewer({ url }: Props) {
  pdfjs.GlobalWorkerOptions.workerSrc =
    " https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js";

  const [pages, setPages] = useState<PDFPageProxy[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);

  const selectPage = (pageNo: number) => {
    setSelectedPages((prev: number[]) => [...prev, pageNo]);
  };

  useEffect(() => {
    console.log(selectedPages);
  }, [selectedPages]);

  useEffect(() => {
    const renderer = async () => {
      setLoading(true);
      const loadingTask = pdfjs.getDocument(url);
      console.log("getting your document");
      const pdf = await loadingTask.promise;
      let collection: any[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        collection.push(page);
      }
      setPages(() => collection);
    };
    renderer().then(() => {
      console.log("got the all pages");
      setLoading(false);
    });
    return () => {
      setPages([]);
    };
  }, [url]);

  return (
    <div>
      <div className="flex gap-5 p-4 flex-wrap justify-center">
        {loading && <div>Please wait ...</div>}
        {pages.length > 0 &&
          pages.map((page: any, idx: number) => (
            <div
              key={idx}
              className="flex items-center justify-center flex-col"
            >
              <GetPdfPage
                page={page}
                idx={idx + 1}
                onClickHandler={selectPage}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default PdfViewer;
