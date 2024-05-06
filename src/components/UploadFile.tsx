import { ChangeEventHandler } from "react";

interface Props {
  onChangeHandle: ChangeEventHandler;
}
const UploadFile = ({ onChangeHandle }: Props) => {
  return (
    <div className="flex items-center justify-center ">
      <div>
        <label
          className="px-5 py-2 cursor-pointer rounded-lg shadow-lg bg-blue-500 text-white font-semibold select-none"
          htmlFor="pdffile"
        >
          Upload File
        </label>
      </div>
      <input
        className="hidden"
        id="pdffile"
        type="file"
        onChange={onChangeHandle}
      />
    </div>
  );
};

export default UploadFile;
