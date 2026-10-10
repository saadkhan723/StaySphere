function formatDate(date) {
  if (!date) {
    return "";
  }

  const formattedDate = new Date(date);

  if (Number.isNaN(formattedDate.getTime())) {
    return "";
  }

  return formattedDate.toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default formatDate;