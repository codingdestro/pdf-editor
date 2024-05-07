import React, { useState } from "react";
import PdfViewer from "../../components/PdfViewer";
import { createFileUrl } from "../../utils/createFileUrl";
import UploadFile from "../../components/UploadFile";
import Button from "../../components/Button";
import { useLocation } from "react-router-dom";
import { useAddPage } from "../../hooks/useAddPage";
import uploadFile from "../../utils/uploadFile";

const index = () => {
  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState<File>();
  const location = useLocation();
  const { addPage, pages } = useAddPage();
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files!.length > 0 && e.target.files != null) {
      setFile(e.target!.files[0]);
    }
    const link = createFileUrl(e.target.files);

    link && setFileUrl(link);
  };
  return (
    <div>
      <div className="flex py-5 gap-x-5 items-center justify-center w-full">
        <UploadFile onChangeHandle={handleInput} />
        <Button
          disable={fileUrl == ""}
          onClickHandler={() =>
            location.pathname === "/pages/extract"
              ? uploadFile(file!, pages)
              : console.log("delete page")
          }
        >
          {location.pathname === "/pages/extract"
            ? "Extract Page"
            : "Delete Page"}
        </Button>
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
