export const formatDate = (dateString, format = "YYYY-MM-DD HH:mm:ss") => {
  const date = new Date(dateString);

  const pad = (num) => num.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  if (format === "YYYY-MM-DD HH:mm:ss") {
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  } else if (format === "DD/MM/YYYY") {
    return `${day}/${month}/${year}`;
  } else if (format === "MM-DD-YYYY") {
    return `${month}-${day}-${year}`;
  } else {
    return date.toISOString(); // Default to ISO format
  }
};

export const formatMoney = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
