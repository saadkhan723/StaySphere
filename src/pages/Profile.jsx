import { useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Muhammad Khan",
    email: "muhammad@example.com",
    phone: "+92 300 1234567",
    country: "Pakistan",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    offers: true,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((currentProfile) => ({
      ...currentProfile,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleNotificationChange = (name) => {
    setNotifications((currentSettings) => ({
      ...currentSettings,
      [name]: !currentSettings[name],
    }));
  };

  return (
    <main className="profile-page">
      <section className="section">
        <div className="container">

          <div className="profile-header">
            <div>
              <h1 className="section-title">My Profile</h1>

              <p className="section-subtitle">
                Manage your personal information and account settings.
              </p>
            </div>

            {isEditing ? (
              <div className="profile-header-actions">
                <button
                  type="button"
                  className="profile-cancel-button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="profile-edit-button"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="profile-edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="profile-layout">

            <aside className="profile-sidebar">

              <div className="profile-avatar">
                MK
              </div>

              <h2>{profile.name}</h2>

              <p>{profile.email}</p>

              <nav className="profile-menu">

                <Link
                  to="/profile"
                  className="active"
                >
                  Profile
                </Link>

                <Link to="/my-bookings">
                  My Bookings
                </Link>

                <Link to="/wishlist">
                  Wishlist
                </Link>

                <Link to="/login">
                  Logout
                </Link>

              </nav>

            </aside>

            <div className="profile-content">

              <div className="profile-card">

                <div className="profile-card-header">
                  <div>
                    <h2>Personal Information</h2>

                    <p>
                      Keep your account information up to date.
                    </p>
                  </div>
                </div>

                <div className="profile-info-grid">

                  <div>
                    <span>Full Name</span>

                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                      />
                    ) : (
                      <strong>{profile.name}</strong>
                    )}
                  </div>

                  <div>
                    <span>Email Address</span>

                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                      />
                    ) : (
                      <strong>{profile.email}</strong>
                    )}
                  </div>

                  <div>
                    <span>Phone Number</span>

                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                      />
                    ) : (
                      <strong>{profile.phone}</strong>
                    )}
                  </div>

                  <div>
                    <span>Country</span>

                    {isEditing ? (
                      <input
                        type="text"
                        name="country"
                        value={profile.country}
                        onChange={handleChange}
                      />
                    ) : (
                      <strong>{profile.country}</strong>
                    )}
                  </div>

                </div>

              </div>

              <div className="profile-card">

                <h2>Account Overview</h2>

                <div className="profile-stats">

                  <div>
                    <strong>3</strong>
                    <span>Total Bookings</span>
                  </div>

                  <div>
                    <strong>3</strong>
                    <span>Wishlist Hotels</span>
                  </div>

                  <div>
                    <strong>2</strong>
                    <span>Reviews</span>
                  </div>

                </div>

              </div>

              <div className="profile-card">

                <h2>Account Settings</h2>

                <div className="profile-settings">

                  <div>
                    <div>
                      <strong>Email Notifications</strong>

                      <p>
                        Receive booking and travel updates by email.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={() =>
                        handleNotificationChange("email")
                      }
                    />
                  </div>

                  <div>
                    <div>
                      <strong>Travel Offers</strong>

                      <p>
                        Receive special deals and travel offers.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={notifications.offers}
                      onChange={() =>
                        handleNotificationChange("offers")
                      }
                    />
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>
    </main>
  );
}

export default Profile;