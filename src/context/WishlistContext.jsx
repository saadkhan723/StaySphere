import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext = createContext();

function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem(
      "staysphere-wishlist"
    );

    try {
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "staysphere-wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const addToWishlist = (hotel) => {
    setWishlist((currentWishlist) => {
      const alreadyExists = currentWishlist.some(
        (item) => item.id === hotel.id
      );

      if (alreadyExists) {
        return currentWishlist;
      }

      return [...currentWishlist, hotel];
    });
  };

  const removeFromWishlist = (hotelId) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter(
        (item) => item.id !== hotelId
      )
    );
  };

  const toggleWishlist = (hotel) => {
    setWishlist((currentWishlist) => {
      const alreadyExists = currentWishlist.some(
        (item) => item.id === hotel.id
      );

      if (alreadyExists) {
        return currentWishlist.filter(
          (item) => item.id !== hotel.id
        );
      }

      return [...currentWishlist, hotel];
    });
  };

  const isInWishlist = (hotelId) => {
    return wishlist.some(
      (item) => item.id === hotelId
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}

export default WishlistProvider;