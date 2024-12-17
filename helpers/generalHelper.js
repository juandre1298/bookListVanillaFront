export const normalizeString = (str) => {
  return str
  .toString().replaceAll(" ","").replaceAll(".","").replaceAll(",","").toLowerCase();
}