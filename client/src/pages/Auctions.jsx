import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";

const Auctions = () => {
  const [sortOption, setSortOption] = useState("start-desc");

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <main className="bg-gray-50 text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <Navbar />

      <section className="pt-28 pb-12 px-4 md:px-8 lg:px-24">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <h1 className="text-3xl font-semibold">Active Auctions</h1>

          <div className="flex items-center gap-4">
            {/* 🔽 Date Sort Filter */}
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="bg-white dark:bg-gray-800 border dark:border-gray-700 text-sm px-3 py-2 rounded"
            >
              <option value="start-desc">Start Date ↓</option>
              <option value="start-asc">Start Date ↑</option>
              <option value="end-desc">End Date ↓</option>
              <option value="end-asc">End Date ↑</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((auction) => (
            <div
              key={auction}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-2">Auction #{auction}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Starts: July 20, 2025<br />
                Ends: July 25, 2025
              </p>
              <Link
                to={`/auction/${auction}`}
                className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
              >
                View Auction
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Auctions;
