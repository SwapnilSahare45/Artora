const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const artworkRoutes = require("./routes/artwork.routes");

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

// Enable CORS for the client URL with credentials
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use("/api/auth", userRoutes); // Routes for user authentication
app.use("/api/artworks", artworkRoutes); // Routes for artwork management

// Start the server and listen on the specified port
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});