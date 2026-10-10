import { BrowserRouter, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

import AuthProvider from "./context/AuthContext.jsx";
import BookingProvider from "./context/BookingContext.jsx";
import WishlistProvider from "./context/WishlistContext.jsx";

function AppContent() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}

      <main>
        <AppRoutes />
      </main>

      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <WishlistProvider>
            <AppContent />
          </WishlistProvider>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;