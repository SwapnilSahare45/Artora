const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        sparse: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "collector", "artist"],
        default: "collector",
    },
    isVerified: {
        type: Boolean,
        default: false,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/drknlre9y/image/upload/v1753180352/artora-artwork-thumbnail/rcogwgtamntcq75l6acd.png",
        required: true,
    },
    bio: {
        type: String,
    }
},
    {
        timestamps: true,
    }
);

// Hash the password before saving the user document
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;