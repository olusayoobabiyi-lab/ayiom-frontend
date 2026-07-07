export const truncate = (str, maxLength = 100) => {
  if (!str) return "";
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength).trim()}…`;
};

export default truncate;