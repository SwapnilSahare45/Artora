import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArtworkCard from "@/components/ArtworkCard";
import Filter from "@/components/ArtFilters"; // Make sure this path is correct

const Artworks = () => {
  // Dummy data — will be replaced by real data later
  const artworks = [
    {
      id: 1,
      image: "https://source.unsplash.com/random/400x400?art1",
      title: "Mystic Forest",
      artist: "Ava Green",
      price: "$1,000",
      timeLeft: null,
      type: "direct",
    },
    {
      id: 2,
      image: "https://source.unsplash.com/random/400x400?art2",
      title: "Silent Horizon",
      artist: "Leo Waters",
      price: "$900",
      timeLeft: "3d 4h",
      type: "auction",
    },
    {
      id: 3,
      image: "https://source.unsplash.com/random/400x400?art3",
      title: "Urban Chaos",
      artist: "Mira Blue",
      price: "$650",
      timeLeft: null,
      type: "direct",
    },
    {
      id: 4,
      image: "https://source.unsplash.com/random/400x400?art4",
      title: "Twilight Vibes",
      artist: "Jonas Hart",
      price: "$1,400",
      timeLeft: "5d 1h",
      type: "auction",
    },
    {
      id: 5,
      image: "https://source.unsplash.com/random/400x400?art2",
      title: "Silent Horizon",
      artist: "Leo Waters",
      price: "$900",
      timeLeft: "3d 4h",
      type: "auction",
    },
    {
      id: 6,
      image: "https://source.unsplash.com/random/400x400?art3",
      title: "Urban Chaos",
      artist: "Mira Blue",
      price: "$650",
      timeLeft: null,
      type: "direct",
    },
    {
      id: 7,
      image: "https://source.unsplash.com/random/400x400?art4",
      title: "Twilight Vibes",
      artist: "Jonas Hart",
      price: "$1,400",
      timeLeft: "5d 1h",
      type: "auction",
    },
  ];

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

          {/* Artwork Grid */}
          <div className="sticky top-24 self-start lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {artworks.map((art) => (
              <ArtworkCard
                key={art.id}
                image={art.image}
                title={art.title}
                artist={art.artist}
                price={art.price}
                timeLeft={art.type === "auction" ? art.timeLeft : null}
                to={`/artwork/${art.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Artworks;
