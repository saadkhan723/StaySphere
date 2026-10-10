export function truncateText(text, maxLength = 100) {
  if (!text) {
    return "";
  }

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}...`;
}

export function getDiscountPercentage(oldPrice, newPrice) {
  if (
    !Number.isFinite(oldPrice) ||
    !Number.isFinite(newPrice) ||
    oldPrice <= 0 ||
    newPrice < 0 ||
    newPrice >= oldPrice
  ) {
    return 0;
  }

  return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
}

export function getNights(checkIn, checkOut) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime())
  ) {
    return 0;
  }

  const startDate = Date.UTC(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );

  const endDate = Date.UTC(
    end.getFullYear(),
    end.getMonth(),
    end.getDate()
  );

  const nights = Math.round(
    (endDate - startDate) / (1000 * 60 * 60 * 24)
  );

  return Math.max(0, nights);
}

export function capitalizeFirstLetter(text) {
  if (!text) {
    return "";
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getInitials(name) {
  if (!name) {
    return "";
  }

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}