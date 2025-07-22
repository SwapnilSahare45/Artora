const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendOTP = async (email, code) => {
    await transporter.sendMail({
        from: `"Artora" <${process.env.EMAIL}>`,
        to: email,
        subject: "Verify your Email - OTP",
        html: `<p>Your OTP is <strong>${code}<strong>. It expires in 5 minutes.<p>`
    });
};