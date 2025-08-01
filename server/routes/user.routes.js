const express = require("express");
const { register, login, verifyOtp, getMe, updateMe, logout } = require("../controllers/user.controller");
const protect = require("../middleware/protect.middleware");
const upload = require("../util/multer.config");

const router = express.Router();

router.post("/register", register); // Route for user registration

router.post("/verify-otp", verifyOtp); // Route for verify otp

router.post("/login", login); // Route for user login

router.get("/me", protect, getMe); // Route for get profile of logged-in user

// Route for update logged-in user profile
router.put("/me", protect, upload.single('avatar'), updateMe);

router.post("/logout", protect, logout); // Route for logout

module.exports = router;