export const useFormat = () => {
  const dateOnlyFormat = new Intl.DateTimeFormat("de", { dateStyle: "long" });
  return { dateOnlyFormat };
};
