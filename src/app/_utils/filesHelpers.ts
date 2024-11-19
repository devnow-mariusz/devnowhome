export const getFileExtension = (file: File): string => {
  const fileName = file.name;
  const parts = fileName.split(".");

  if (parts.length > 1) {
    return `${parts.pop()}`;
  }

  return "Nieznany";
};

export const getFileSizeFromBase64 = (base64String: string): number => {
  const stringLength = base64String.length;
  const sizeInBytes =
    (stringLength * 3) / 4 -
    (base64String.endsWith("==") ? 2 : base64String.endsWith("=") ? 1 : 0);
  return sizeInBytes;
};
