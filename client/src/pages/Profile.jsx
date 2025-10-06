import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Bell, Settings, Pencil, Save, X, Trash2, Edit, Upload } from "lucide-react";
import { useArtworkStore } from "../store/artworkStore";
import { useAuthStore } from "../store/authStore";
import ProfileSkeleton from "../components/skeleton/ProfileSkeleton";
import MyArtworkCardSkeleton from "../components/skeleton/MyArtworkCardSkeleton";
import { toast } from "react-toastify";

const Profile = () => {

  const [isEditing, setIsEditing] = useState(false);

  const [avatarFile, setAvatarFile] = useState(null);

  // State to hold previewUrl of avatar when edit
  const [previewUrl, setPreviewUrl] = useState(null);

  const [filterArtworks, setFilterArtworks] = useState([]);

  const { profile, user, isLoading: profileLoading, updateProfile, error: profileError } = useAuthStore();

  const { getMyArtworks, deleteArtwork, artworks, isLoading: artworksLoading, error: artworkError } = useArtworkStore();

  useEffect(() => {
    profile();
    getMyArtworks();
  }, [profile, getMyArtworks]);

  useEffect(() => {
    if (artworks) {
      setFilterArtworks(artworks);
    }
  }, [artworks]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const [editData, setEditData] = useState(user);

  useEffect(() => {
    if (user) setEditData(user);
  }, [user]);

  //Function to handle save for profile edit
  const handleSave = async () => {
    // Append edit data
    const data = new FormData();
    data.append('avatar', avatarFile);
    data.append('name', editData.name);
    data.append('bio', editData.bio);

    const { success } = await updateProfile(data);
  
    if (success) {
      toast.success("Profile update successfully.");
      setIsEditing(false);
    }
  };

  // Function to handle artowrk delete
  const handleDeleteArtwork = async (id) => {
    const { success } = await deleteArtwork(id);
    if (success) {
      toast.success("Artwork deleted successfully.");
      // filter the deleted artwork
      setFilterArtworks(prev => prev.filter(art => art._id !== id));
    }
  };

  useEffect(() => {
    if (profileError || artworkError) {
      toast.error(profileError || artworkError);
    }
  }, [profileError, artworkError]);

  return (
    <main className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <Navbar />

      <section className="pt-28 pb-16 px-4 md:px-8 lg:px-24 max-w-5xl mx-auto">

        {
          !profileLoading ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
              <div className="flex flex-col items-center sm:items-center gap-6 md:flex-row md:items-start">
                <div className="relative">

                  {/* User avatar */}
                  <img
                    src={previewUrl || user?.avatar}
                    alt="avatar"
                    className="w-24 h-24 rounded-full border border-gray-300 dark:border-gray-600 object-cover"
                  />
                  {/* TO edit user avatar */}
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div className="flex flex-col">
                  {/* TO edit user details */}
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={editData?.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                        className="bg-white dark:bg-gray-900 border px-3 py-1 rounded mb-2 w-full sm:w-64"
                      />
                      <textarea
                        value={editData?.bio}
                        onChange={(e) =>
                          setEditData({ ...editData, bio: e.target.value })
                        }
                        rows={2}
                        className="bg-white dark:bg-gray-900 border px-3 py-1 rounded w-full sm:w-64"
                      />
                    </>
                  ) : (
                    <>
                      {/* User details */}
                      <h2 className="text-2xl font-semibold">
                        {user?.name}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300">
                        {user?.email}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {user?.bio}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                {/* To save or cancel buttons when edit */}
                {isEditing ? (
                  <>
                    {/* Save button */}
                    <button
                      className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 flex items-center gap-2"
                      onClick={handleSave}
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    {/* Cancel button */}
                    <button
                      onClick={() => {
                        setEditData(user);
                        setIsEditing(false);
                        setAvatarFile(null);
                        setPreviewUrl(null);
                      }}
                      className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </>
                ) : (
                  // Edit button
                  <button
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 flex items-center gap-2"
                    onClick={() => setIsEditing(true)}
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                )}
              </div>
            </div>
          ) : (
            <ProfileSkeleton />
          )
        }

        {/* Quick Access */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          <Link
            to="/notifications"
            className="quick-link"
          >
            <Bell className="w-6 h-6 mb-2" />
            Notifications
          </Link>
          <Link
            to="/orders"
            className="quick-link"
          >
            <ShoppingBag className="w-6 h-6 mb-2" />
            Orders
          </Link>
          <Link
            to="/wishlist"
            className="quick-link"
          >
            <Heart className="w-6 h-6 mb-2" />
            Wishlist
          </Link>
          <Link
            to="/settings"
            className="quick-link"
          >
            <Settings className="w-6 h-6 mb-2" />
            Settings
          </Link>
        </div>

        {/* My Artworks */}
        <h3 className="text-xl font-semibold mb-4">My Artworks</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            artworks ? (
              !artworksLoading ? (
                filterArtworks.map((art) => (
                  <div
                    key={art?._id}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
                  >
                    <img
                      src={art?.thumbnail}
                      alt={art?.title}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                    <h4 className="font-medium text-lg mb-1">{art?.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      ₹ {art.inAuction ? art?.openingBid : art?.price}
                    </p>
                    <div className="flex justify-end gap-3">
                      {
                        // Only direct sell artwork can be edit
                        !art.inAuction &&
                        <Link
                          to={!art.inAuction && `/update-artwork-direct/${art._id}`}
                          className="text-primary hover:underline text-sm flex items-center gap-1"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Link>
                      }

                      {/* BUtton to delete artwork */}
                      <button
                        className="text-red-500 hover:underline text-sm flex items-center gap-1"
                        onClick={() => handleDeleteArtwork(art._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <MyArtworkCardSkeleton />
                  <MyArtworkCardSkeleton />
                  <MyArtworkCardSkeleton />
                </>
              )
            ) : (
              <p>No artwork found.</p>
            )
          }
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Profile;