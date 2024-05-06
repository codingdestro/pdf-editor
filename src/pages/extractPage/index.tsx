import React, { useState } from "react";
import PdfViewer from "../../components/PdfViewer";
import { createFileUrl } from "../../utils/createFileUrl";
import UploadFile from "../../components/UploadFile";
import Button from "../../components/Button";
import { useLocation } from "react-router-dom";

const index = () => {
  const [fileUrl, setFileUrl] = useState("");
  const location = useLocation();
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
              ? console.log("extract page")
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
            <PdfViewer url={fileUrl} />
          </div>
        )}
      </div>
    </div>
  );
};

export default index;
