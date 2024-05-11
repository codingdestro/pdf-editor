import { useState } from "react";
import UploadFile from "../../components/UploadFile";
import Button from "../../components/Button";

const Index = () => {
  const [file, setFile] = useState<File>();
  const uploadPDF = (e: File) => {
    if (e.type === "application/pdf") {
      setFile(e);
    } else {
      alert("please select only pdf files.");
    }
  };

  return (
    <div className=" w-full h-full flex items-center justify-center">
      <div className="flex flex-col gap-y-5">
        <UploadFile onChangeHandle={(e) => uploadPDF(e)} />
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
