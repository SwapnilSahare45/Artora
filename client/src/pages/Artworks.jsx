import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArtworkCard from "@/components/ArtworkCard";
import Filter from "@/components/ArtFilters"; // Make sure this path is correct
import { useArtworkStore } from "../store/artworkStore";
import { useEffect } from "react";
import ArtworkCardSkeleton from "../components/skeleton/ArtworkCardSkeleton";

const Artworks = () => {

  const { getArtworks, artworks, isLoading, error } = useArtworkStore();

  useEffect(() => {
    const fetchArtworks = async () => {
      await getArtworks();
    };
    fetchArtworks();
  }, [getArtworks]);

  if (error) {
    return <p>{error}</p>
  }

  return (
    <main className="bg-gray-50 text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <Navbar />

      <section className="pt-28 pb-12 px-4 md:px-8 lg:px-24">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Explore Artworks</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Browse artworks available for direct purchase or live auction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Sidebar */}
          <aside className="sticky top-24 self-start h-1/3 lg:col-span-1">
            <Filter />
          </aside>

          {
            artworks ? (
              <div className="sticky top-24 self-start lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {
                  !isLoading ? (
                    artworks.map((art) => (
                      <ArtworkCard
                        key={art._id}
                        image={art.thumbnail}
                        title={art.title}
                        artist={art.artist}
                        amount={art.price || art.openingBid}
                        timeLeft={art.inAuction ? art.auctionId.endDate : null}
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
                  )
                }
              </div>
            ) : (
              <p>No artworks found.</p>
            )
          }

        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Artworks;
