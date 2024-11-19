export const getFormattedDate = (date: Date | string) => {
  const dateToFormat = new Date(date);
  const day = dateToFormat.getDate().toString().padStart(2, "0");
  const month = (dateToFormat.getMonth() + 1).toString().padStart(2, "0");
  const year = dateToFormat.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};
