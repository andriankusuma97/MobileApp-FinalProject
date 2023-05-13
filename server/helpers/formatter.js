const dateFormatter = (date) => {
  const datePart = date.toLocaleDateString("en-GB", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  // console.log(datePart, "formatter");
  const timePart = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateTime = datePart + " | " + timePart;
  // console.log(dateTime, "datetime");
  return dateTime;
};

const priceFormatter = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

module.exports = { dateFormatter, priceFormatter };
