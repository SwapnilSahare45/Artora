const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");
const artworkRoutes = require("./routes/artwork.routes");
const auctionRoutes = require("./routes/auction.routes");
const orderRoutes = require("./routes/order.routes");
const wishlistRoutes = require("./routes/wishlist.routes");
const feedbackRoutes = require("./routes/feedback.routes");
const notificationRoutes = require("./routes/notification.routes");

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// Enable CORS for the client URL with credentials
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

// API route handlers
app.use("/api/auth", userRoutes); // User authentication and management routes
app.use("/api/artworks", artworkRoutes); // Artwork-related routes
app.use("/api/auctions", auctionRoutes); // Auction-related routes
app.use("/api/orders", orderRoutes); // Order-related routes
app.use("/api/wishlist", wishlistRoutes); // Wishlist-related routes
app.use("/api/notifications", notificationRoutes);
app.use("/api/feedback", feedbackRoutes); // Feedback-related routes

// Start the server and listen on the specified port
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});