import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Pencil } from "lucide-react";

const settingsTabs = ["Profile", "Security"];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const [username, setUsername] = useState("John Doe");
  const [bio, setBio] = useState("Artist | Painter | Dreamer");
  const [profilePic, setProfilePic] = useState("/default-profile.png");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <Navbar />

      <div className="pt-28 pb-16 px-4 md:px-12 lg:px-24 max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 border-r border-gray-200 dark:border-gray-700 px-4">
          <ul className="space-y-2">
            {settingsTabs.map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-4 py-2 rounded transition ${
                    activeTab === tab
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <section className="w-full md:w-3/4">
          {activeTab === "Profile" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Profile Settings</h2>

              {/* Profile Picture Upload */}
              <div className="relative w-24 h-24">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border dark:border-gray-600"
                />
                <label
                  htmlFor="profileUpload"
                  className="absolute bottom-0 right-0 bg-primary p-1.5 rounded-full cursor-pointer"
                >
                  <Pencil size={16} className="text-white" />
                  <input
                    type="file"
                    id="profileUpload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Username Input */}
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full p-3 rounded border dark:border-gray-600 bg-white dark:bg-gray-800"
              />

              {/* Bio Input */}
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write a short bio..."
                rows={4}
                className="w-full p-3 rounded border dark:border-gray-600 bg-white dark:bg-gray-800"
              />

              {/* Save Button */}
              <button className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition">
                Save Changes
              </button>
            </div>
          )}

          {activeTab === "Security" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Security Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="password"
                  placeholder="New Password"
                  className="p-3 rounded border dark:border-gray-600 bg-white dark:bg-gray-800"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="p-3 rounded border dark:border-gray-600 bg-white dark:bg-gray-800"
                />
              </div>
              <button className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition">
                Change Password
              </button>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default Settings;
