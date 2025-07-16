import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserCard from "@/components/UserCard";
import { useState } from "react";

const Connect = () => {
  const [search, setSearch] = useState("");

  // Dummy people list — swap with real data later
  const people = [
    { id: 1, name: "Riya Sharma", role: "Artist", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
    { id: 2, name: "Kabir Mehta", role: "Collector", avatar: "https://randomuser.me/api/portraits/men/43.jpg" },
    { id: 3, name: "Anika Rao", role: "Artist", avatar: "https://randomuser.me/api/portraits/women/32.jpg" },
    { id: 4, name: "Dev Joshi", role: "Gallery Owner", avatar: "https://randomuser.me/api/portraits/men/71.jpg" },
    { id: 5, name: "Mira Kaur", role: "Artist", avatar: "https://randomuser.me/api/portraits/women/12.jpg" },
  ];

  // Simple search filter (client‑side only for demo)
  const filteredPeople = people.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="bg-gray-50 text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <Navbar />

      <section className="pt-28 pb-12 px-4 md:px-8 lg:px-24">
        <h1 className="text-3xl font-semibold mb-8 text-center">Connect with Artists & Collectors</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 👉 Sidebar: search / filters */}
          <aside className="sticky top-24 self-start lg:col-span-1 bg-white  shadow dark:bg-gray-800 rounded p-4">
            <h2 className="text-lg font-semibold mb-4">Search</h2>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name…"
              className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded px-4 py-2 text-sm"
            />
            {/* You can add more filter controls here later (roles, categories, etc.) */}
          </aside>

          {/* 👉 People grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPeople.map((person) => (
              <UserCard
                key={person.id}
                user={person}
                // onConnect={() => {}}          {/* no logic, design‑only */}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Connect;
