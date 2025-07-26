const express = require("express");
const { register, login, verifyOtp, getProfile, getMe, updateMe, getUsers } = require("../controllers/user.controller");
const protect = require("../middleware/protect.middleware");
const upload = require("../util/multer.config");

const router = express.Router();

router.post("/register", register); // Route for user registration

router.post("/verify-otp", verifyOtp); // Route for verify otp

router.post("/login", login); // Route for user login

router.get("/me", protect, getMe); // Route for get profile of logged-in user

// Route for update logged-in user profile
router.put("/me", protect, upload.single('avatar'), updateMe);

// Route for get all users
router.get("/users", protect, getUsers);

router.get("/profile/:id", protect, getProfile); // Route for get profile by id

module.exports = router;