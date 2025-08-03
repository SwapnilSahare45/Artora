# Artora

**Artora** is a full-stack **MERN** web application that allows users to **buy, sell, and bid** for artwork through **auctions**. To access these features, users must log in. If a user doesn't have an account, they must register and verify via **OTP**.

The platform includes **Profile**, **Wishlist**, **Orders**, **Notifications**, and **Payment** sections. Multiple payment options like **Card, UPI, Wallet, and COD** are shown, but currently only **COD (Cash on Delivery)** is implemented. Users can filter artworks by various criteria for better browsing.

---

## ✨ Features

- **OTP-based Authentication**
- **Direct Sell and Auction** artwork listings
- **Artwork Filtering** (by category, style, orientation, etc.)
- **Add/Remove** artworks to/from **Wishlist**
- **Notification System** for *auctions, bids, and orders* (not real-time)
- **Editable User Profile**
- Upload artworks with **Thumbnail + Multiple Images**
- **Update** listed artworks (only for direct sell)
- **Simulated Order System** (COD only)
- **Theme Toggle** for *Light / Dark / System*

---

## 🛠 Tech Stack

### Frontend:
- React.js
- Tailwind CSS
- Zustand (state management)
- React Router DOM
- React Loading Skeleton

### Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- Cloudinary (Image Hosting)
- Nodemailer (Email via OTP)
- Multer (File Upload)
- Cron (Auction Ending Logic)

---

## 🔐 Environment Variables

### Backend:
```env
MONGO_URI=your_mongo_uri
PORT=5000
JWT_SECRET=your_jwt_secret
CLIENT_URL=frontend_url
EMAIL=your_email
EMAIL_PASS=your_email_app_password
CLOUDINARY_CLOUD_NAME=cloudinary_cloud_name
CLOUDINARY_API_KEY=cloudinary_api_key
CLOUDINARY_API_SECRET=cloudinary_api_secret
```

### Frontend
```env
VITE_ARTORA_API_BASE_URL=your_api_base_url
```

## ⚙️ Installation

### Frontend
```bash
cd client
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
npm start
