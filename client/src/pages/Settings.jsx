import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const settingsTabs = ["Profile", "Privacy", "Notifications", "Theme", "Security"];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <Navbar />

      <div className="pt-28 pb-16 px-4 md:px-12 lg:px-24 max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
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

        {/* Content */}
        <section className="w-full md:w-3/4">
          {activeTab === "Profile" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Profile Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="p-3 rounded border dark:border-gray-600 bg-white dark:bg-gray-800"
                />
                <input
                  type="text"
                  placeholder="Username"
                  className="p-3 rounded border dark:border-gray-600 bg-white dark:bg-gray-800"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="p-3 w-full rounded border dark:border-gray-600 bg-white dark:bg-gray-800"
              />
            </div>
          )}

          {activeTab === "Privacy" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Privacy</h2>
              <div className="flex justify-between items-center p-4 border rounded dark:border-gray-600 bg-white dark:bg-gray-800">
                <p>Make my profile private</p>
                <input type="checkbox" className="w-5 h-5" />
              </div>
              <div className="flex justify-between items-center p-4 border rounded dark:border-gray-600 bg-white dark:bg-gray-800">
                <p>Hide activity status</p>
                <input type="checkbox" className="w-5 h-5" />
              </div>
            </div>
          )}

          {activeTab === "Notifications" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Notification Settings</h2>
              <div className="flex justify-between items-center p-4 border rounded dark:border-gray-600 bg-white dark:bg-gray-800">
                <p>Email Notifications</p>
                <input type="checkbox" className="w-5 h-5" />
              </div>
              <div className="flex justify-between items-center p-4 border rounded dark:border-gray-600 bg-white dark:bg-gray-800">
                <p>Push Notifications</p>
                <input type="checkbox" className="w-5 h-5" />
              </div>
            </div>
          )}

          {activeTab === "Theme" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Theme Settings</h2>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="radio" name="theme" defaultChecked />
                  Light Mode
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="theme" />
                  Dark Mode
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="theme" />
                  System Default
                </label>
              </div>
            </div>
          )}

          {activeTab === "Security" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Security</h2>
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
              <button className="mt-4 bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition">
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
