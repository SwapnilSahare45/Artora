import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArtworkCard from "@/components/ArtworkCard";
import Filter from "@/components/ArtFilters";
import { useParams, Link } from "react-router-dom";
import { useArtworkStore } from "../store/artworkStore";
import { useAuctionStore } from "../store/auctionStore";
import { useEffect } from "react";
import ArtworkCardSkeleton from "../components/skeleton/ArtworkCardSkeleton";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

const Auction = () => {

  const { id } = useParams();

  // States from auction store
  const { getAuction, auction, isLoading: auctionLoading, error: auctionError } = useAuctionStore();
  // States from artwork store
  const { getAuctionArtworks, artworks, isLoading: artworkLoading, error: artworkError } = useArtworkStore();

  // Fetch auction and artwork when component mount or id changes
  useEffect(() => {
    if (id) {
      getAuction(id);
      getAuctionArtworks(id);
    }
  }, [id]);

  // Handle filters
  const handleFilterChange = (filters) => {
    getAuctionArtworks(id, filters);
  }

  // Show an error when component mount or auctionError, artworkError changes
  useEffect(() => {
    if (auctionError || artworkError) {
      toast.error(auctionError || artworkError);
    }
  }, [auctionError, artworkError]);

  return (
    <main className="bg-gray-50 text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <Navbar />

      {/* Artwork section */}
      <section className="pt-20 pb-12 px-4 md:px-8 md:pt-28 lg:px-24">
        <div className="mb-8 flex flex-col justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            {
              !auctionLoading ? (
                <h1 className="text-3xl font-semibold mb-2">
                  {auction?.title}
                </h1>
              ) : (
                <Skeleton width="60%" height={30} className="mb-2" />
              )
            }
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Browse and bid on exclusive artworks available in this curated auction collection.
            </p>
          </div>

          {/* Link to add artwork in auction */}
          <Link
            to={`/add-artwork-auction/${id}`}
            className="bg-primary text-white px-4 py-2 self-start rounded hover:bg-opacity-90 transition"
          >
            Add Artwork to Auction
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Filter Sidebar */}
          <aside className="hidden sticky top-24 self-start h-1/3 md:flex lg:col-span-1">
            <Filter
              onFilterChange={handleFilterChange}
              inAuction={true}
            />
          </aside>

          {/* Artwork Grid */}
          <div className="sticky top-24 self-start md:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {
              !artworkLoading ? (
                artworks.map((artwork) => (
                  <ArtworkCard
                    key={artwork._id}
                    image={artwork.thumbnail}
                    title={artwork.title}
                    artist={artwork.artist}
                    amount={artwork.openingBid}
                    timeLeft={auction?.endDate}
                    to={`/artwork/${artwork._id}`}
                  />
                ))
              ) : (
                <>
                  <ArtworkCardSkeleton />
                  <ArtworkCardSkeleton />
                  <ArtworkCardSkeleton />
                  <ArtworkCardSkeleton />
                  <ArtworkCardSkeleton />
                  <ArtworkCardSkeleton />
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

export default Auction;