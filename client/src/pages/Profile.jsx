import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  MessageCircle,
  Settings,
  Pencil,
  Save,
  X,
} from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Art enthusiast and collector",
    avatar: "https://i.pravatar.cc/150?img=25",
  });

  const [editData, setEditData] = useState(user);

  const handleSave = () => {
    setUser(editData);
    setIsEditing(false);
  };

  return (
    <main className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <Navbar />

      <section className="pt-28 pb-16 px-4 md:px-8 lg:px-24 max-w-5xl mx-auto">
        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
          <div className="flex items-start sm:items-center gap-6">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-24 h-24 rounded-full border border-gray-300 dark:border-gray-600"
            />
            <div>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="bg-white dark:bg-gray-900 border px-3 py-1 rounded mb-2 w-full sm:w-64"
                  />
                  <textarea
                    value={editData.bio}
                    onChange={(e) =>
                      setEditData({ ...editData, bio: e.target.value })
                    }
                    rows={2}
                    className="bg-white dark:bg-gray-900 border px-3 py-1 rounded w-full sm:w-64"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold">{user.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {user.email}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {user.bio}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditData(user);
                    setIsEditing(false);
                  }}
                  className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 flex items-center gap-2"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Quick Access Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          <Link
            to="/orders"
            className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <ShoppingBag className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">Orders</span>
          </Link>
          <Link
            to="/wishlist"
            className="flex flex-col items-center justify-center bg-white  dark:bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <Heart className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">Wishlist</span>
          </Link>
          <Link
            to="/messages"
            className="flex flex-col items-center justify-center bg-white  dark:bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <MessageCircle className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">Messages</span>
          </Link>
          <Link
            to="/settings"
            className="flex flex-col items-center justify-center bg-white  dark:bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <Settings className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Profile;
