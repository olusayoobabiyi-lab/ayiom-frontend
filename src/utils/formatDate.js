export const formatDate = (date, locale = "en-US", options = { year: "numeric", month: "long", day: "numeric" }) => {
  if (!date) return "";
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
};

export default formatDate;