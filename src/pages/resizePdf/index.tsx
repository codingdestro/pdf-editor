import React, { useState } from "react";
import UploadFile from "../../components/UploadFile";
import Button from "../../components/Button";

const Index = () => {
  const [file, setFile] = useState<File>();
  const uploadPDF = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file != null && file.length > 0) {
      if (file[0].type === "application/pdf") {
        setFile(file[0]);
      } else {
        alert("please select only pdf files.");
      }
    }
  };
  return (
    <div className=" w-full h-full flex items-center justify-center">
      <div className="flex flex-col gap-y-5">
        <UploadFile onChangeHandle={uploadPDF} />
        <Button
          disable={file ? false : true}
          onClickHandler={() => console.log(file)}
        >
          Resize PDF
        </Button>
      </div>
    </div>
  );
};

export default Index;
