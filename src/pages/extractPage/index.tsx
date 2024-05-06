import React, { useState } from "react";
import PdfViewer from "../../PdfViewer";
import { createFileUrl } from "../../utils/createFileUrl";
import UploadFile from "../../components/UploadFile";

const index = () => {
  const [fileUrl, setFileUrl] = useState("");
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = createFileUrl(e.target.files);
    link && setFileUrl(link);
  };
  return (
    <div>
      <div>
        <UploadFile onChangeHandle={handleInput} />
      </div>
      <div>
        {fileUrl && (
          <div className="overflow-auto h-[800px] m-5 rounded-lg bg-red-100">
            <PdfViewer url={fileUrl} />
          </div>
        )}
      </div>
    </div>
  );
};

export default index;
