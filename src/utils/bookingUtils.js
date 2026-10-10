export function calculateBookingTotal(
  pricePerNight,
  nights,
  rooms = 1,
  taxRate = 0.10,
  serviceFee = 1000
) {
  const price = Number(pricePerNight);
  const stayNights = Number(nights);
  const roomCount = Number(rooms);

  if (
    !Number.isFinite(price) ||
    !Number.isFinite(stayNights) ||
    !Number.isFinite(roomCount) ||
    price < 0 ||
    stayNights < 1 ||
    roomCount < 1
  ) {
    return {
      subtotal: 0,
      taxes: 0,
      serviceFee: 0,
      total: 0,
    };
  }

  const subtotal = price * stayNights * roomCount;
  const taxes = Math.round(subtotal * taxRate);
  const total = subtotal + taxes + serviceFee;

  return {
    subtotal,
    taxes,
    serviceFee,
    total,
  };
}

export function calculatePricePerNight(totalPrice, nights) {
  const total = Number(totalPrice);
  const stayNights = Number(nights);

  if (
    !Number.isFinite(total) ||
    !Number.isFinite(stayNights) ||
    total < 0 ||
    stayNights <= 0
  ) {
    return 0;
  }

  return Math.round(total / stayNights);
}

export function isValidStay(checkIn, checkOut) {
  if (!checkIn || !checkOut) {
    return false;
  }

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime())
  ) {
    return false;
  }

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  return end > start;
}