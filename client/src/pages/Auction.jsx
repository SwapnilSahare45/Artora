import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArtworkCard from "@/components/ArtworkCard";
import AuctionFilter from "@/components/AuctionFilters";
import { useParams, Link } from "react-router-dom";
import { useArtworkStore } from "../store/artworkStore";
import { useAuctionStore } from "../store/auctionStore";
import { useEffect } from "react";
import ArtworkCardSkeleton from "../components/skeleton/ArtworkCardSkeleton";
import Skeleton from "react-loading-skeleton";

const Auction = () => {
  const { id } = useParams();

  // Get states from auction and artwork store
  const { getAuction, auction, isLoading: auctionLoading, error: auctionError } = useAuctionStore();
  const { getAuctionArtworks, artworks, isLoading: artworkLoading, error: artworkError } = useArtworkStore();

  // Fetch the auction object and artworks when component mount
  useEffect(() => {
    const fetchAuction = async (id) => {
      await getAuction(id);
    };
    fetchAuction(id);

    const fetchAuctionArtworks = async (id) => {
      await getAuctionArtworks(id);
    };
    fetchAuctionArtworks(id);
  }, [getAuctionArtworks, getAuction]);

  // Show error
  if (auctionError || artworkError) {
    return <p>{auctionError || artworkError}</p>
  }

  return (
    <main
      className="bg-gray-50 text-black dark:bg-gray-900 dark:text-white min-h-screen"
    >
      <Navbar />

      {/* Artwork section */}
      <section
        className="pt-28 pb-12 px-4 md:px-8 lg:px-24"
      >
        <div
          className="mb-8 flex justify-between"
        >
          <div>
            {
              !auctionLoading ? (
                <h1
                  className="text-3xl font-semibold mb-2"
                >
                  {auction?.title}
                </h1>
              ) : (
                <Skeleton width="60%" height={30} className="mb-2" />
              )
            }
            <p
              className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
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

        <div
          className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        >
          {/* Filter Sidebar */}
          <aside
            className="sticky top-24 self-start h-1/3 lg:col-span-1"
          >
            <AuctionFilter />
          </aside>

          {/* Artwork Grid */}
          <div
            className="sticky top-24 self-start lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {
              !artworkLoading ? (
                artworks.map((artwork) => (
                  <ArtworkCard
                    key={artwork._id}
                    image={artwork.thumbnail}
                    title={artwork.title}
                    artist={artwork.artist}
                    amount={artwork.openingBid}
                    timeLeft={auction.endDate}
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