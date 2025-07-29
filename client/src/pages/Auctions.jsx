import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useAuctionStore } from "../store/auctionStore";
import AuctionCard from "../components/AuctionCard";
import AuctionCardSkeleton from "../components/skeleton/AuctionCardSkeleton";
import { toast } from "react-toastify";


const Auctions = () => {

  // State to hold sort filter option
  const [sortOption, setSortOption] = useState("start-desc");

  // States from auction store
  const { getAuctions, auctions, isLoading, error } = useAuctionStore();

  // Fetch the auctions when component mount or getAuctions changes
  useEffect(() => {
    getAuctions();
  }, [getAuctions]);

  // Show an error when component mount or error changes
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <main className="bg-gray-50 text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <Navbar />

      {/* Auction section */}
      <section className="pt-28 pb-12 px-4 md:px-8 lg:px-24">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <h1 className="text-3xl font-semibold">
            Active Auctions
          </h1>

          <div className="flex items-center gap-4">
            {/* Date Sort Filter */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-white dark:bg-gray-800 border dark:border-gray-700 text-sm px-3 py-2 rounded"
            >
              <option value="start-desc">
                Start Date ↓
              </option>
              <option value="start-asc">
                Start Date ↑
              </option>
              <option value="end-desc">
                End Date ↓
              </option>
              <option value="end-asc">
                End Date ↑
              </option>
            </select>
          </div>
        </div>

        {/* Conditional rendering for auctions */}
        {
          auctions ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {
                // Conditional redering for loading state
                !isLoading ? (
                  auctions.map((auction) => (
                    <AuctionCard
                      key={auction._id}
                      id={auction._id}
                      title={auction.title}
                      startDate={auction.startDate}
                      endDate={auction.endDate}
                    />
                  ))
                ) : (
                  <>
                    {/* When is loading show auction card skeleton */}
                    <AuctionCardSkeleton />
                    <AuctionCardSkeleton />
                    <AuctionCardSkeleton />
                    <AuctionCardSkeleton />
                    <AuctionCardSkeleton />
                    <AuctionCardSkeleton />
                  </>
                )
              }
            </div>
          ) : (
            <p
              className="text-center"
            >
              No auction found.
            </p>
          )
        }
      </section>

      <Footer />
    </main>
  );
};

export default Auctions;