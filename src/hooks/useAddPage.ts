import { useState } from "react";
type PagesObj = {
  [key: string]: boolean;
};

export const useAddPage = () => {
  const [pages, setPages] = useState<PagesObj>({});

  const addPage = (pageNo: number, val: boolean) => {
    setPages((prev: PagesObj) => ({ ...prev, [pageNo.toString()]: val }));
  };

  return { pages, addPage };
};
