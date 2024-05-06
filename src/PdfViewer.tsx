import * as pdfjs from "pdfjs-dist";
import { PDFPageProxy } from "pdfjs-dist/types/display/api";
import { useRef, useEffect, useState } from "react";

interface Props {
  url: string;
}

function GetPdfPage({ page }: { page: PDFPageProxy }) {
  const canvaRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(true);

  const toggleSelected = () => setSelected((prev: boolean) => !prev);

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
      className={`${selected ? "border border-red-400 border-2xl rounded-lg overflow-hidden" : ""}`}
      onClick={toggleSelected}
    >
      {loading && <div>loading</div>}
      <canvas ref={canvaRef}></canvas>
    </div>
  );
}

function PdfViewer({ url }: Props) {
  pdfjs.GlobalWorkerOptions.workerSrc =
    " https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js";

  const [pages, setPages] = useState<PDFPageProxy[]>([]);
  const [loading, setLoading] = useState(false);

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
      <div className="flex gap-5 p-4 flex-wrap">
        {loading && <div>Please wait ...</div>}
        {pages.length > 0 &&
          pages.map((page: any, idx: number) => (
            <div key={idx}>
              <GetPdfPage page={page} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default PdfViewer;
