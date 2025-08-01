import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Auctions from './pages/Auctions';
import Auction from './pages/Auction';
import Artworks from './pages/Artworks';
import Artwork from './pages/Artwork';
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
import PlaceOrder from './pages/PlaceOrder';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<Home />} />

            {/* Public Routes */}
            <Route element={<PublicRoute />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="verify" element={<Otp />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="profile" element={<Profile />} />
                <Route path="artworks" element={<Artworks />} />
                <Route path="artwork/:id" element={<Artwork />} />
                <Route path="auctions" element={<Auctions />} />
                <Route path="auction/:id" element={<Auction />} />
                <Route path="add-artwork-direct" element={<AddArtworkDirectSell />} />
                <Route path="update-artwork-direct/:id" element={<AddArtworkDirectSell />} />
                <Route path="add-artwork-auction/:id" element={<AddArtworkAuction />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="orders" element={<Orders />} />
                <Route path="order/:id" element={<Order />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="settings" element={<Settings />} />
                <Route path="place-order/:id" element={<PlaceOrder />} />
                <Route path="feedback" element={<FeedbackForm />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>

    );
};

export default AppRoutes;
