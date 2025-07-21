const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const flightsRouter = require('./routes/flights');
const authRoutes = require('./routes/auth.js');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://flight-search-frontend-dzd90csdw-richard-lys-projects.vercel.app'
    ],
    credentials: true
}));
app.use('/flights', flightsRouter);
app.use('/api/auth', authRoutes);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => 
        console.error("MongoDB connection error:", err));
app.listen(process.env.PORT || 4000, () => {
    console.log('REST API running at http://localhost:4000');
})
