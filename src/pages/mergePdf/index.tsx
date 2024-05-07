import React, { useEffect, useState } from "react";
import UploadFile from "../../components/UploadFile";
import Button from "../../components/Button";
import { useMergeFile } from "../../utils/uploadFile";

type FileType = {
  pdf1: File | null;
  pdf2: File | null;
};

const Home = () => {
  const [files, setFiles] = useState<FileType>({
    pdf1: null,
    pdf2: null,
  });

  const { upload, downloadHref } = useMergeFile();

  const handleUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "pdf1" | "pdf2",
  ) => {
    const file = e.target.files;
    if (file != null && file?.length > 0)
      setFiles((prev: FileType) => ({ ...prev, [key]: file[0] }));
  };

  const UploadPDFsFile = () => {
    if (!files["pdf1"] || !files["pdf2"]) alert("please select both files!");
    else
      upload("http://localhost:5759/pdf/merge", files["pdf1"], files["pdf2"]);
  };

  useEffect(() => {
    console.log(files);
  }, [files]);
  return (
    <section className=" h-full flex items-center justify-center">
      <main className=" gap-5 p-9 shadow-lg border rounded-lg flex flex-col items-center">
        <div className="flex gap-5">
          <UploadFile
            onChangeHandle={(e) => handleUpload(e, "pdf1")}
            name="Upload PDF 1"
          />
          <UploadFile
            onChangeHandle={(e) => handleUpload(e, "pdf2")}
            name="Upload PDF 2"
          />
        </div>
        <div>
          <Button
            onClickHandler={UploadPDFsFile}
            disable={files["pdf1"] && files["pdf2"] ? false : true}
          >
            Merger PDFs
          </Button>
        </div>
        <div>
          <a
            download={"mergedPDF"}
            href={downloadHref}
            className={`px-5 py-2 rounded-lg border ${downloadHref ? "bg-green-400" : "hidden"}`}
          >
            Download PDF
          </a>
        </div>
      </main>
    </section>
  );
};

export default Home;
