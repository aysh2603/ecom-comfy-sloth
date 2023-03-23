export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(Math.floor(number * 0.5));
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  //Since colors is an array in array so we use flat()
  if (type === "colors") {
    unique = unique.flat();
  }
  return ["all", ...new Set(unique)];
};
