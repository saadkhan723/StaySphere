import { useState } from "react";

function Users() {
  const [search, setSearch] = useState("");

  const users = [
    {
      id: 1,
      name: "Ali Khan",
      email: "ali.khan@example.com",
      phone: "+92 300 1234567",
      bookings: 5,
      joined: "12 Jan 2026",
      status: "Active",
    },
    {
      id: 2,
      name: "Ahmed Shah",
      email: "ahmed.shah@example.com",
      phone: "+92 301 2345678",
      bookings: 3,
      joined: "28 Feb 2026",
      status: "Active",
    },
    {
      id: 3,
      name: "Usman Ali",
      email: "usman.ali@example.com",
      phone: "+92 302 3456789",
      bookings: 7,
      joined: "15 Mar 2026",
      status: "Active",
    },
    {
      id: 4,
      name: "Sara Khan",
      email: "sara.khan@example.com",
      phone: "+92 303 4567890",
      bookings: 2,
      joined: "04 Apr 2026",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Hamza Malik",
      email: "hamza.malik@example.com",
      phone: "+92 304 5678901",
      bookings: 4,
      joined: "21 May 2026",
      status: "Active",
    },
  ];

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email} ${user.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <span className="admin-label">MANAGEMENT</span>

          <h1 className="section-title">Users</h1>

          <p className="section-subtitle">
            Manage registered StaySphere users and their accounts.
          </p>
        </div>

        <div className="admin-user-total">
          <strong>{users.length}</strong>
          <span>Total Users</span>
        </div>
      </div>

      <div className="admin-toolbar">
        <input
          type="text"
          placeholder="Search users by name, email or phone..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select>
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-header">
          <div>
            <h2>User List</h2>
            <p>{filteredUsers.length} users found</p>
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Phone</th>
                <th>Bookings</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="admin-user-name">
                      <div className="admin-user-avatar">
                        {user.name.charAt(0)}
                      </div>

                      <div>
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>{user.phone}</td>

                  <td>
                    <strong>{user.bookings}</strong>
                  </td>

                  <td>{user.joined}</td>

                  <td>
                    <span
                      className={`admin-status ${
                        user.status === "Active"
                          ? "active"
                          : "inactive"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td>
                    <div className="admin-actions">
                      <button title="View">👁️</button>
                      <button title="Edit">✏️</button>
                      <button title="Delete">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="admin-empty-state">
            <div>👥</div>

            <h3>No users found</h3>

            <p>
              Try searching with a different name, email or phone.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;