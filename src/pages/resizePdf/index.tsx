import React from "react";
import UploadFile from "../../components/UploadFile";
import Button from "../../components/Button";

const Index = () => {
  const uploadPDF = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file != null && file.length > 0) {
      console.log("we can resize the pdf file.");
    }
  };
  return (
    <div className=" w-full h-full flex items-center justify-center">
      <div className="flex flex-col gap-y-5">
        <UploadFile onChangeHandle={uploadPDF} />
        <Button disable={true}>Resize PDF</Button>
      </div>
    </div>
  );
};

export default Index;
