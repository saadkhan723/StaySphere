# StaySphere — Hotel & Travel Booking Platform

StaySphere is a full-stack hotel and travel booking web application built to provide users with a simple way to explore hotels, manage reservations, and discover travel options. It also includes an admin dashboard for managing hotel listings and bookings.

## Features

- Hotel listing and hotel details pages
- Hotel booking form with check-in and check-out dates
- Booking price summary and confirmation page
- My Bookings page
- Wishlist functionality
- User registration and login
- Admin dashboard
- Hotel management
- Booking management with confirm and cancel actions
- Responsive interface for desktop and mobile screens
- MongoDB database integration

## Tech Stack

**Frontend**
- React
- Vite
- JavaScript
- HTML5
- CSS3
- React Router

**Backend**
- Node.js
- Express.js
- REST API

**Database**
- MongoDB
- Mongoose

**Tools**
- Git and GitHub
- Visual Studio Code
- npm

## Project Structure

```text
StaySphere/
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   └── server.js
├── src/
│   ├── admin/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── App.jsx
├── public/
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js and npm
- MongoDB
- Git

### 1. Clone the repository

```bash
git clone https://github.com/saadkhan723/StaySphere.git
cd StaySphere
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `backend/` directory and configure the environment variables required by your backend, such as the MongoDB connection URI and server port.

Example:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/staysphere
```

Do not commit real credentials, passwords, or secret keys to GitHub.

### 5. Start the backend

From the `backend/` directory, run the command defined by your backend `package.json`. For example, if the project has a `start` script:

```bash
npm start
```

### 6. Start the frontend

Open a second terminal in the project root:

```bash
npm run dev
```

Open the local URL displayed by Vite in your terminal.

## Project Status

StaySphere is an ongoing portfolio project. Core hotel booking, booking confirmation, wishlist, and admin booking workflows have been implemented and tested locally. Additional testing and improvements may be made as development continues.

## Author

**Muhammad Saad**

- GitHub: [saadkhan723](https://github.com/saadkhan723)

## Disclaimer

StaySphere is an educational and portfolio project. It is not affiliated with any real hotel booking company.
