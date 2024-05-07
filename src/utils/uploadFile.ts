type PagesObj = {
  [key: string]: boolean;
};

const uploadFile = (file: Blob, pages: PagesObj) => {
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
  form.append("pageArr", blob);
};

export default uploadFile;
