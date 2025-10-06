const express = require("express");
const { register, login, verifyOtp, getMe, updateMe, logout } = require("../controllers/user.controller");
const { protect } = require("../middleware/protect.middleware");
const upload = require("../util/multer.config");

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/me", protect, upload.single('avatar'), updateMe);
router.post("/logout", protect, logout);

module.exports = router;