import { useArtworkStore } from "../store/artworkStore";
import { useEffect } from "react";
import { toast } from "react-toastify";
import ArtworkCard from "@/components/ArtworkCard";
import ArtworkCardSkeleton from "@/components/skeleton/ArtworkCardSkeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Filter from "@/components/ArtFilters";

const Artworks = () => {
  // States from artwork store
  const { getArtworks, artworks, isLoading, error, page, totalPages, setPage, } = useArtworkStore();

  // get the artworks when component mount
  useEffect(() => {
    getArtworks({ page });
  }, [page]);

  // handle filter
  const handleFilterChange = (filters) => {
    setPage(1);
    getArtworks({ ...filters, page: 1 });
  };

  // error
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // Pegination component
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
    <main className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <Navbar />
      <section className="pt-20 md:pt-28 pb-16 px-4 sm:px-6 md:px-12">
        <div className="mb-10 text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Explore Artworks</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover curated pieces available for direct purchase.
          </p>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          <aside className="h-[200px] md:h-auto lg:col-span-1 lg:sticky lg:top-28 lg:self-start">
            <Filter onFilterChange={handleFilterChange} />
          </aside>

          <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {!isLoading ? (
              artworks.map((art) => (
                <ArtworkCard
                  key={art._id}
                  image={art.thumbnail}
                  title={art.title}
                  artist={art.artist}
                  amount={art.price || art.openingBid}
                  to={`/artwork/${art._id}`}
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
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && renderPagination()}
      </section>
      <Footer />
    </main>
  );
};

export default Artworks;
