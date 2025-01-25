export const useFormat = () => {
  const dateOnlyFormat = new Intl.DateTimeFormat("de", { dateStyle: "long" });
  const timeOnlyFormat = new Intl.DateTimeFormat("de", {
    timeStyle: "short",
    dateStyle: undefined,
  });
  return { dateOnlyFormat, timeOnlyFormat };
};
