import { useState } from "react";
import { RefObject } from "react";

type PagesObj = {
  [key: string]: boolean;
};

const uploadFile = async (
  file: Blob,
  pages: PagesObj,
  downloadRef: RefObject<HTMLAnchorElement>,
) => {
  const pageArr: number[] = [];
  for (const x in pages) {
    if (pages[x] == true) {
      pageArr.push(parseInt(x));
    }
  }
  const uintArr = new Uint8Array(pageArr);
  const blob = new Blob([uintArr]);
  const form = new FormData();
  form.append("pdf", file);
  form.append("pages", pageArr.toString());
  console.log(blob);
  try {
    const e = await fetch("http://localhost:5759/pages/extract", {
      method: "POST",
      body: form,
    });
    const res = await e.blob();
    if (downloadRef != null) {
      const href = URL.createObjectURL(res);
      downloadRef.current!.href = href;
    }
  } catch (e) {
    console.log(e);
  }
};

export const useUploadFile = () => {
  const [downloadHref, setDownloadHref] = useState("");

  const upload = async (url: string, file: Blob, pages: PagesObj) => {
    setDownloadHref("");
    const pageArr: number[] = [];
    for (const x in pages) {
      if (pages[x] == true) {
        pageArr.push(parseInt(x));
      }
    }
    const form = new FormData();
    form.append("pdf", file);
    form.append("pages", pageArr.toString());
    try {
      const e = await fetch(url, {
        method: "POST",
        body: form,
      });
      const res = await e.blob();
      const href = URL.createObjectURL(res);
      setDownloadHref(href);
    } catch (e) {
      console.log(e);
    }
  };

  return { downloadHref, upload };
};

export default uploadFile;
