import { useState } from "react";
import PdfViewer from "../../components/PdfViewer";
import UploadFile from "../../components/UploadFile";
import Button from "../../components/Button";
import { useLocation } from "react-router-dom";
import { useAddPage } from "../../hooks/useAddPage";
import { useUploadFile } from "../../utils/uploadFile";

const index = () => {
  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState<File>();
  const location = useLocation();

  const { upload, downloadHref } = useUploadFile();

  const { addPage, pages } = useAddPage();
  const handleInput = (file: File) => {
    setFile(file);
    const link = URL.createObjectURL(file);
    link && setFileUrl(link);
  };
  return (
    <div>
      <div className="flex py-5 gap-x-5 items-center justify-center w-full ">
        <div className="w-[500px] border flex items-center justify-around shadow-lg rounded-3xl  p-5 ">
          <UploadFile onChangeHandle={handleInput} />

          <div className="flex flex-col gap-2">
            <Button
              disable={fileUrl == ""}
              onClickHandler={() =>
                location.pathname === "/pages/extract"
                  ? // ? uploadFile(file!, pages, downloadRef)
                  upload("http://localhost:5759/pages/extract", file!, pages)
                  : upload("http://localhost:5759/pages/delete", file!, pages)
              }
            >
              {location.pathname === "/pages/extract"
                ? "Extract Page"
                : "Delete Page"}
            </Button>
            <a
              href={downloadHref}
              download={"testPdf"}
              className={`${downloadHref ? "bg-green-400" : ""} text-center px-5 py-2 rounded-lg `}
            >
              download
            </a>
          </div>
        </div>
      </div>
      <div>
        {fileUrl && (
          <div className="overflow-auto h-[800px] m-5 border rounded-lg shadow-lg ">
            <PdfViewer file={fileUrl} addPage={addPage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default index;
