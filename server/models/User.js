const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: () => {
            return !this.googleId;
        },
        unique: true,
        sparse: true,
    },
    password: {
        type: String,
        required: () => {
            return !this.googleId;
        },
    },
    googleId: {
        type: String,
        required: () => {
            return !this.password;
        },
        unique: true,
        sparse: true,
    },
    avatar: {
        type: String,
    },
},
    {
        timestamps: true,
    }
);

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