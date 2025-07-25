import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Connect from './pages/Connect';
import Auctions from './pages/Auctions';
import Auction from './pages/Auction';
import Artworks from './pages/Artworks';
import Artwork from './pages/Artwork';
import Messages from './pages/Messages';
import Payment from './pages/Payment';
import Orders from './pages/Orders';
import FeedbackForm from './pages/FeedbackForm';
import Wishlist from './pages/Wishlist';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import AddArtworkDirectSell from './pages/AddArtworkDirectSell';
import AddArtworkAuction from './pages/AddArtworkAuction';
import Order from './pages/Order';
import Otp from './pages/Otp';

const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path='verify' element={<Otp />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connect" element={<Connect />} />
            <Route path="auctions" element={<Auctions />} />
            <Route path="auction/:id" element={<Auction />} />
            <Route path="artworks" element={<Artworks />} />
            <Route path="artwork/:id" element={<Artwork />} />
            <Route path="messages" element={<Messages />} />
            <Route path="payment" element={<Payment />} />
            <Route path="orders" element={<Orders />} />
            <Route path='order/:id' element={<Order />} />
            <Route path="add-artwork-direct" element={<AddArtworkDirectSell />} />
            <Route path='add-artwork-auction/:id' element={<AddArtworkAuction />} />
            <Route path="feedback" element={<FeedbackForm />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
