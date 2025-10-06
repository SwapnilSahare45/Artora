import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useAuctionStore } from "../store/auctionStore";
import AuctionCard from "../components/AuctionCard";
import AuctionCardSkeleton from "../components/skeleton/AuctionCardSkeleton";
import { toast } from "react-toastify";


const Auctions = () => {

  const { getAuctions, auctions, isLoading, error } = useAuctionStore();

  useEffect(() => {
    getAuctions();
  }, [getAuctions]);

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
        </div>

        {/* Conditional rendering for auctions */}
        {
          auctions ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {
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