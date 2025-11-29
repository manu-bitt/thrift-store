# Thrift Store Website

A full-stack thrift store application built with React (frontend) and Node.js/Express (backend) with MongoDB database.

## Features

- 🛍️ Browse and shop for pre-loved items
- 🛒 Shopping cart functionality
- 💖 Wishlist management
- 📦 Sell your own items
- 💳 Checkout process
- 📱 Responsive design

## Tech Stack

### Frontend
- React 18
- React Router
- Material-UI
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `server` directory (already created):
```env
MONGO_URI=mongodb://127.0.0.1:27017/thriftstore
PORT=5000
```

4. Make sure MongoDB is running on your system. If using MongoDB Atlas, update the `MONGO_URI` in `.env`.

5. Seed the database with sample products (optional):
```bash
node seed.js
```

6. Start the server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Project Structure

```
thrift-store/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/           # API calls
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Context providers
│   │   ├── pages/         # Page components
│   │   └── App.jsx        # Main app component
│   └── package.json
├── server/                 # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── seed.js           # Database seeding script
│   ├── server.js         # Express server
│   └── package.json
└── README.md
```

## API Endpoints

- `GET /api/products` - Get all products
- `POST /api/products` - Add a new product

## Available Scripts

### Backend
- `npm start` - Start the server
- `npm run dev` - Start server with nodemon (auto-reload)

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Notes

- The frontend is configured to connect to `http://localhost:5000` for API calls
- Cart and Wishlist data are stored in browser localStorage
- Make sure both frontend and backend servers are running simultaneously

## Troubleshooting

1. **MongoDB Connection Error**: Ensure MongoDB is running and the connection string in `.env` is correct
2. **CORS Errors**: The backend has CORS enabled for all origins. If issues persist, check the CORS configuration in `server.js`
3. **Port Already in Use**: Change the PORT in `.env` file if port 5000 is already in use
