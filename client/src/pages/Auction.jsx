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
  const { getAuctionArtworks, artworks, isLoading: artworkLoading, error: artworkError, page, totalPages, setPage } = useArtworkStore();

  // Fetch auction and artwork when component mount or id changes
  useEffect(() => {
    if (id) {
      getAuction(id);
      getAuctionArtworks(id, { page });
    }
  }, [id, page]);

  // Handle filters
  const handleFilterChange = (filters) => {
    setPage(1);
    getAuctionArtworks(id, { ...filters, page: 1 });
  }

  // Show an error when component mount or auctionError, artworkError changes
  useEffect(() => {
    if (auctionError || artworkError) {
      toast.error(auctionError || artworkError);
    }
  }, [auctionError, artworkError]);

  // pegination component
  const renderPagination = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
      <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
        <button
          onClick={() => page > 1 && setPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
        >
          Previous
        </button>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 rounded-md ${page === p
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              } hover:bg-blue-500 hover:text-white transition`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => page < totalPages && setPage(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };

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
          <aside className="hidden sticky top-24 self-start  md:flex lg:col-span-1">
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
                    amount={artwork.currnetBid === 0 ? artwork.openingBid : artwork.currnetBid}
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

        {/* Pagination */}
        {totalPages > 1 && renderPagination()}
      </section>

      <Footer />
    </main>
  );
};

export default Auction;