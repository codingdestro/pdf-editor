export const createFileUrl = (file: FileList | null) => {
  if (file!.length > 0 && file != null) {
    const link = URL.createObjectURL(file[0]);
    return link;
  }
};
