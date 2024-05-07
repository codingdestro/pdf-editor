import { useState } from "react";

interface Props {
  onChangeHandle: (e: File) => void;
  name?: string;
}

const randomName = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};

const UploadFile = ({ onChangeHandle, name }: Props) => {
  const [selectedFile, setSelectedFile] = useState("");
  const wrapperOnChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file != null && file.length > 0) {
      setSelectedFile(file[0].name);
      onChangeHandle(file[0]);
    }
  };
  const Id = randomName();
  return (
    <div className="flex items-center justify-center ">
      <div>
        <label
          className="px-5 py-2 cursor-pointer rounded-lg shadow-lg border text-white font-semibold select-none flex flex-col items-center gap-3"
          htmlFor={Id}
        >
          <img src="/upload.png" className="w-[44px]" />
          <p className="text-slate-400 font-normal">
            {selectedFile || name || "Upload File"}
          </p>
        </label>
      </div>
      <input
        className="hidden"
        id={Id}
        type="file"
        onChange={wrapperOnChangeHandle}
      />
    </div>
  );
};

export default UploadFile;
