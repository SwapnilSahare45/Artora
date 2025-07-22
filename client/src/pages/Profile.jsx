import { useState, useEffect } from "react";
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
  Trash2,
  Edit,
  Upload
} from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Art enthusiast and collector",
    avatar: "https://i.pravatar.cc/150?img=25"
  });
  const [editData, setEditData] = useState(user);
  const [artworks, setArtworks] = useState([]);
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    // Replace this with actual API call
    setArtworks([
      {
        _id: "1",
        title: "Sunset Art",
        image: "https://placehold.co/150x100",
        price: "$100"
      },
      {
        _id: "2",
        title: "Modern Painting",
        image: "https://placehold.co/150x100",
        price: "$150"
      }
    ]);
  }, []);

  const handleSave = () => {
    // Handle avatar file upload
    if (avatarFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...editData, avatar: reader.result });
        setIsEditing(false);
        setAvatarFile(null);
      };
      reader.readAsDataURL(avatarFile);
    } else {
      setUser(editData);
      setIsEditing(false);
    }
  };

  const handleEditArtwork = (id) => {
    // Redirect to edit artwork page
    console.log("Edit artwork", id);
  };

  const handleDeleteArtwork = (id) => {
    // Remove from DB and state
    setArtworks((prev) => prev.filter((art) => art._id !== id));
  };

  return (
    <main className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16 px-4 md:px-8 lg:px-24 max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
          <div className="flex items-start sm:items-center gap-6">
            <div className="relative">
              <img
                src={avatarFile ? URL.createObjectURL(avatarFile) : user.avatar}
                alt="avatar"
                className="w-24 h-24 rounded-full border border-gray-300 dark:border-gray-600 object-cover"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAvatarFile(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              )}
            </div>
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
                    setAvatarFile(null);
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

        {/* Quick Access */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          <Link to="/orders" className="quick-link"><ShoppingBag className="w-6 h-6 mb-2" /> Orders</Link>
          <Link to="/wishlist" className="quick-link"><Heart className="w-6 h-6 mb-2" /> Wishlist</Link>
          <Link to="/messages" className="quick-link"><MessageCircle className="w-6 h-6 mb-2" /> Messages</Link>
          <Link to="/settings" className="quick-link"><Settings className="w-6 h-6 mb-2" /> Settings</Link>
        </div>

        {/* My Artworks */}
        <h3 className="text-xl font-semibold mb-4">My Artworks</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((art) => (
            <div
              key={art._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
            >
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h4 className="font-medium text-lg mb-1">{art.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {art.price}
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => handleEditArtwork(art._id)}
                  className="text-primary hover:underline text-sm flex items-center gap-1"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteArtwork(art._id)}
                  className="text-red-500 hover:underline text-sm flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Profile;
