import { useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    siteName: "StaySphere",
    email: "admin@staysphere.com",
    phone: "+92 300 1234567",
    currency: "PKR",
    bookingNotifications: true,
    emailNotifications: true,
    maintenanceMode: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setSettings((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Settings saved successfully.");
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <span className="admin-label">SYSTEM</span>

          <h1 className="section-title">Settings</h1>

          <p className="section-subtitle">
            Manage your StaySphere platform settings.
          </p>
        </div>
      </div>

      <form className="admin-settings" onSubmit={handleSubmit}>
        <div className="admin-settings-card">
          <div className="admin-settings-header">
            <h2>General Settings</h2>
            <p>Basic information about your platform.</p>
          </div>

          <div className="admin-settings-grid">
            <div className="admin-settings-field">
              <label htmlFor="siteName">Website Name</label>
              <input
                id="siteName"
                name="siteName"
                type="text"
                value={settings.siteName}
                onChange={handleChange}
              />
            </div>

            <div className="admin-settings-field">
              <label htmlFor="email">Admin Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={settings.email}
                onChange={handleChange}
              />
            </div>

            <div className="admin-settings-field">
              <label htmlFor="phone">Contact Phone</label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={settings.phone}
                onChange={handleChange}
              />
            </div>

            <div className="admin-settings-field">
              <label htmlFor="currency">Currency</label>

              <select
                id="currency"
                name="currency"
                value={settings.currency}
                onChange={handleChange}
              >
                <option value="PKR">PKR - Pakistani Rupee</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="AED">AED - UAE Dirham</option>
              </select>
            </div>
          </div>
        </div>

        <div className="admin-settings-card">
          <div className="admin-settings-header">
            <h2>Notifications</h2>
            <p>Control how the admin receives notifications.</p>
          </div>

          <div className="admin-setting-option">
            <div>
              <strong>Booking Notifications</strong>
              <span>Receive notifications when a new booking is created.</span>
            </div>

            <label className="admin-switch">
              <input
                type="checkbox"
                name="bookingNotifications"
                checked={settings.bookingNotifications}
                onChange={handleChange}
              />
              <span></span>
            </label>
          </div>

          <div className="admin-setting-option">
            <div>
              <strong>Email Notifications</strong>
              <span>Receive important platform updates by email.</span>
            </div>

            <label className="admin-switch">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
              />
              <span></span>
            </label>
          </div>
        </div>

        <div className="admin-settings-card">
          <div className="admin-settings-header">
            <h2>System</h2>
            <p>Control the availability of your website.</p>
          </div>

          <div className="admin-setting-option">
            <div>
              <strong>Maintenance Mode</strong>
              <span>
                Temporarily disable the website for maintenance.
              </span>
            </div>

            <label className="admin-switch">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
              />
              <span></span>
            </label>
          </div>
        </div>

        <div className="admin-settings-actions">
          <button type="submit" className="admin-primary-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;