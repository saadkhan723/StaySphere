import { Routes, Route } from "react-router-dom";

// Public Pages
import Home from "../pages/Home.jsx";
import Hotels from "../pages/Hotels.jsx";
import HotelDetails from "../pages/HotelDetails.jsx";
import Tours from "../pages/Tours.jsx";
import TourDetails from "../pages/TourDetails.jsx";
import Deals from "../pages/Deals.jsx";
import Booking from "../pages/Booking.jsx";
import BookingConfirmation from "../pages/BookingConfirmation.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import Wishlist from "../pages/Wishlist.jsx";
import MyBookings from "../pages/MyBookings.jsx";
import Profile from "../pages/Profile.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import NotFound from "../pages/NotFound.jsx";
import HelpCenter from "../pages/HelpCenter.jsx";
import PrivacyPolicy from "../pages/PrivacyPolicy.jsx";
import TermsConditions from "../pages/TermsConditions.jsx";

// Admin Pages
import AdminLayout from "../admin/layouts/AdminLayout.jsx";
import AdminLogin from "../admin/pages/AdminLogin.jsx";
import Dashboard from "../admin/pages/Dashboard.jsx";
import AdminHotels from "../admin/pages/Hotels.jsx";
import AddHotel from "../admin/pages/AddHotel.jsx";
import AdminRooms from "../admin/pages/Rooms.jsx";
import AdminTours from "../admin/pages/Tours.jsx";
import AdminUsers from "../admin/pages/Users.jsx";
import AdminBookings from "../admin/pages/Bookings.jsx";
import AdminReviews from "../admin/pages/Reviews.jsx";
import AdminDeals from "../admin/pages/Deals.jsx";
import AdminSettings from "../admin/pages/Settings.jsx";

function AppRoutes() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Hotels */}
      <Route path="/hotels" element={<Hotels />} />
      <Route path="/hotel/:id" element={<HotelDetails />} />

      {/* Tours and Deals */}
      <Route path="/tours" element={<Tours />} />
      <Route path="/tour/:id" element={<TourDetails />} />
      <Route path="/deals" element={<Deals />} />

      {/* Booking */}
      <Route path="/booking" element={<Booking />} />
      <Route
        path="/booking-confirmation"
        element={<BookingConfirmation />}
      />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      {/* User Pages */}
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/profile" element={<Profile />} />

      {/* Company Pages */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Support Pages */}
      <Route path="/help" element={<HelpCenter />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsConditions />} />

      {/* Admin Pages */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="login" element={<AdminLogin />} />
        <Route index element={<Dashboard />} />
        <Route path="hotels" element={<AdminHotels />} />
        <Route path="hotels/add" element={<AddHotel />} />
        <Route path="rooms" element={<AdminRooms />} />
        <Route path="tours" element={<AdminTours />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="deals" element={<AdminDeals />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
