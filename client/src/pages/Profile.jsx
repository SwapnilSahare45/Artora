import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, MessageCircle, Settings, Pencil, Save, X, Trash2, Edit, Upload } from "lucide-react";
import { useArtworkStore } from "../store/artworkStore";
import { useAuthStore } from "../store/authStore";
import ProfileSkeleton from "../components/skeleton/profileSkeleton";
import MyArtworkCardSkeleton from "../components/skeleton/MyArtworkCardSkeleton";

const Profile = () => {
  // State for to edit option
  const [isEditing, setIsEditing] = useState(false);
  // state for user avatar to edit
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Get the states from auth store
  const { profile, user, isLoading: profileLoading, updateProfile, error: profileError } = useAuthStore();
  // Get the states from artwork store
  const { getMyArtworks, artworks, isLoading: artworksLoading, error: artworkError } = useArtworkStore();

  // Fetch logged-in user profile and logged-in user artworks when component mount
  useEffect(() => {
    const fetchMyProfile = async () => {
      await profile();
    };
    fetchMyProfile();

    const fetchGetMyArtworks = async () => {
      await getMyArtworks();
    };
    fetchGetMyArtworks();
  }, [profile, getMyArtworks]);

  // Handle avatar change and set the preview of avatar
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // State for edit user data
  const [editData, setEditData] = useState(user);
  useEffect(() => {
    if (user) setEditData(user);
  }, [user])

  // Handle save
  const handleSave = async () => {
    // Append edit data
    const data = new FormData();
    data.append('avatar', avatarFile);
    data.append('name', editData.name);
    data.append('bio', editData.bio);

    const { success } = await updateProfile(data);
    // If profile update successfully set the isEdit state to false
    if (success) {
      setIsEditing(false);
    }
  }

  // Show errors
  if (profileError || artworkError) {
    return <p>{profileError || artworkError}</p>
  }

  return (
    <main
      className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen"
    >
      <Navbar />

      <section
        className="pt-28 pb-16 px-4 md:px-8 lg:px-24 max-w-5xl mx-auto"
      >

        {/* Conditional redering for profile loading state */}
        {
          !profileLoading ? (
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8"
            >
              <div
                className="flex items-start sm:items-center gap-6"
              >
                <div
                  className="relative"
                >
                  <img
                    src={previewUrl || user?.avatar}
                    alt="avatar"
                    className="w-24 h-24 rounded-full border border-gray-300 dark:border-gray-600 object-cover"
                  />
                  {/* TO edit user avatar */}
                  {isEditing && (
                    <label
                      className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer"
                    >
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
                      <h2
                        className="text-2xl font-semibold"
                      >
                        {user?.name}
                      </h2>
                      <p
                        className="text-gray-600 dark:text-gray-300"
                      >
                        {user?.email}
                      </p>
                      <p
                        className="text-sm text-gray-600 dark:text-gray-400 mt-1"
                      >
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
                      <Save
                        className="w-4 h-4"
                      />
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
                      <X
                        className="w-4 h-4"
                      />
                      Cancel
                    </button>
                  </>
                ) : (
                  // Edit button
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 flex items-center gap-2"
                  >
                    <Pencil
                      className="w-4 h-4"
                    />
                    Edit
                  </button>
                )}
              </div>
            </div>
          ) : (
            // Show the profile skeleton when profile loading state is true
            <ProfileSkeleton />
          )
        }

        {/* Quick Access */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-12"
        >
          <Link
            to="/orders"
            className="quick-link"
          >
            <ShoppingBag
              className="w-6 h-6 mb-2"
            />
            Orders
          </Link>
          <Link
            to="/wishlist"
            className="quick-link"
          >
            <Heart
              className="w-6 h-6 mb-2"
            />
            Wishlist
          </Link>
          <Link
            to="/messages"
            className="quick-link"
          >
            <MessageCircle
              className="w-6 h-6 mb-2"
            />
            Messages
          </Link>
          <Link
            to="/settings"
            className="quick-link"
          >
            <Settings
              className="w-6 h-6 mb-2"
            />
            Settings
          </Link>
        </div>

        {/* My Artworks */}
        <h3
          className="text-xl font-semibold mb-4"
        >
          My Artworks
        </h3>
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {
            // Conditional redering for artworks and artwork loading state
            artworks ? (
              !artworksLoading ? (
                artworks.map((art) => (
                  <div
                    key={art?._id}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
                  >
                    <img
                      src={art?.thumbnail}
                      alt={art?.title}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                    <h4
                      className="font-medium text-lg mb-1"
                    >
                      {art?.title}
                    </h4>
                    <p
                      className="text-sm text-gray-600 dark:text-gray-400 mb-2"
                    >
                      ₹ {art.inAuction ? art?.openingBid : art?.price}
                    </p>
                    <div
                      className="flex justify-end gap-3"
                    >
                      <button
                        className="text-primary hover:underline text-sm flex items-center gap-1"
                      >
                        <Edit
                          className="w-4 h-4"
                        />
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:underline text-sm flex items-center gap-1"
                      >
                        <Trash2
                          className="w-4 h-4"
                        />
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  {/* Show the logged-in artwork card skeleton when artwork state is loading */}
                  <MyArtworkCardSkeleton />
                  <MyArtworkCardSkeleton />
                  <MyArtworkCardSkeleton />
                </>
              )
            ) : (
              // Show when artwork not found
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