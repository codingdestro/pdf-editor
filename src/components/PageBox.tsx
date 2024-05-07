import { PDFPageProxy } from "pdfjs-dist/types/display/api";
import { useRef, useEffect, useState } from "react";

interface Props {
  page: PDFPageProxy;
  idx: number;
  onClickHandler: Function;
}
function PageBox({ page, idx, onClickHandler }: Props) {
  const canvaRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);

  const toggleSelected = () => {
    onClickHandler(idx, !selected);
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
      className={`relative flex-col flex items-center justify-center cursor-pointer`}
      onClick={toggleSelected}
    >
      {loading && <div>loading</div>}
      <>
        <div className="shadow-lg border p-1 bg-white rounded-lg ">
          <canvas
            ref={canvaRef}
            className={`${loading ? "hidden" : "block"}`}
          />
        </div>
        <div
          className={`${selected ? "bg-green-400" : "bg-slate-200"}
      w-14 h-14 flex items-center justify-center scale-50 self-center p-2 rounded-full`}
        >
          {idx + 1}
        </div>
      </>
    </div>
  );
}

export default PageBox;
