import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArtworkCard from "@/components/ArtworkCard";
import AuctionFilter from "@/components/AuctionFilters";
import { useParams, Link } from "react-router-dom";

const Auction = () => {
  const { id } = useParams();

  return (
    <main className="bg-gray-50 text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <Navbar />

      <section className="pt-28 pb-12 px-4 md:px-8 lg:px-24">
        <div className="mb-8 flex justify-between">
          <div>
            <h1 className="text-3xl font-semibold mb-2">Auction #{id}</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Browse and bid on exclusive artworks available in this curated auction collection.
            </p>
          </div>

          <Link
            to={`/add-artwork-auction/${id}`}
            className="bg-primary text-white px-4 py-2 self-start rounded hover:bg-opacity-90 transition"
          >
            Add Artwork to Auction
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Sidebar */}
          <aside className="sticky top-24 self-start h-1/3 lg:col-span-1">
            <AuctionFilter />
          </aside>

          {/* Artwork Grid */}
          <div className="sticky top-24 self-start lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((_, idx) => (
              <ArtworkCard
                key={idx}
                image={`https://source.unsplash.com/random/400x400?sig=${idx}&art`}
                title="Abstract Dreams"
                artist="Emma White"
                price="$1,200"
                timeLeft="2d 6h 14m"
                to={`/artwork/${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Auction;
