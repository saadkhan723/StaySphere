import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

function BookingProvider({ children }) {
  const [booking, setBooking] = useState(null);

  const startBooking = (bookingData) => {
    setBooking(bookingData);
  };

  const updateBooking = (bookingData) => {
    setBooking((currentBooking) => ({
      ...currentBooking,
      ...bookingData,
    }));
  };

  const clearBooking = () => {
    setBooking(null);
  };

  const value = {
    booking,
    startBooking,
    updateBooking,
    clearBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}

export default BookingProvider;