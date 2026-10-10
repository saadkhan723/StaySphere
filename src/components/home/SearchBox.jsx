import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (destination) params.set("destination", destination);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guests) params.set("guests", guests);

    navigate(`/hotels?${params.toString()}`);
  };

  return (
    <div className="hero-search">
      <div className="search-field">
        <label>Where</label>
        <input
          type="text"
          placeholder="Destination or hotel"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <div className="search-field">
        <label>Check-in</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>

      <div className="search-field">
        <label>Check-out</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>

      <div className="search-field">
        <label>Guests</label>

        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        >
          <option value="" disabled>
            Guests
          </option>
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4 Guests</option>
          <option value="5">5+ Guests</option>
        </select>
      </div>

      <button
        className="hero-search-button"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBox;