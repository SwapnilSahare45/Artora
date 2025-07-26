import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserCard from "@/components/UserCard";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import UserCardSkeleton from "../components/skeleton/UserCardSkeleton";

const Connect = () => {

  // State for search filter
  const [search, setSearch] = useState("");

  // Get the states from auth store
  const { getUsers, users, isLoading, error } = useAuthStore();

  // Fetch peoples when component mount
  useEffect(() => {
    const fetchPeoples = async () => {
      await getUsers();
    };
    fetchPeoples();
  }, [getUsers]);

  // Simple search filter (client‑side only for demo)
  const filteredPeople = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Show error
  if (error) {
    return <p>{error}</p>
  }

  return (
    <main
      className="bg-gray-50 text-black dark:bg-gray-900 dark:text-white min-h-screen"
    >
      <Navbar />

      <section
        className="pt-28 pb-12 px-4 md:px-8 lg:px-24"
      >
        <h1
          className="text-3xl font-semibold mb-8 text-center"
        >
          Connect with Artists & Collectors
        </h1>

        <div
          className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        >
          {/* Sidebar: search / filters */}
          <aside
            className="sticky top-24 self-start lg:col-span-1 bg-white  shadow dark:bg-gray-800 rounded p-4"
          >
            <h2
              className="text-lg font-semibold mb-4"
            >
              Search
            </h2>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name…"
              className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded px-4 py-2 text-sm"
            />
          </aside>

          {/* People grid */}
          <div
            className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {/* Conditional redering for loading state */}
            {
              isLoading ? (
                filteredPeople.map((person) => (
                  <UserCard
                    key={person.id}
                    user={person}
                  />
                ))
              ) : (
                <>
                {/* Show when loading state is true */}
                  <UserCardSkeleton />
                  <UserCardSkeleton />
                  <UserCardSkeleton />
                  <UserCardSkeleton />
                  <UserCardSkeleton />
                  <UserCardSkeleton />
                </>
              )
            }
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Connect;
