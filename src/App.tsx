import React, { useState } from "react";
import PdfViewer from "./PdfViewer";

const App = () => {
  const [url, setUrl] = useState("");
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file!.length > 0 && file != null) {
      const link = URL.createObjectURL(file[0]);
      setUrl(link);
    }
  };
  return (
    <div>
      <div className="text-red-500">Pdf Viewer</div>
      <input type="file" onChange={handleInput} />
      {url && <PdfViewer url={url} />}
    </div>
  );
};

export default App;
