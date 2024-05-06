import { ChangeEventHandler } from "react";

interface Props {
  onChangeHandle: ChangeEventHandler;
}
const UploadFile = ({ onChangeHandle }: Props) => {
  return (
    <div className="flex items-center justify-center mt-9">
      <div>
        <label
          className="px-5 py-2 cursor-pointer  border rounded-lg shadow-lg bg-red-500 text-white font-semibold"
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
