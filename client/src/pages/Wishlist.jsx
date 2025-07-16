import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HeartOff, ShoppingCart, Gavel } from "lucide-react";

const dummyWishlist = [
  {
    id: 1,
    title: "Sunset Overdrive",
    artist: "Alice Smith",
    price: "$350",
    type: "direct",
    image: "https://source.unsplash.com/random/400x400/?art,painting",
  },
  {
    id: 2,
    title: "Abstract Storm",
    artist: "Mark R.",
    price: "Starting Bid: $500",
    type: "auction",
    image: "https://source.unsplash.com/random/400x400/?abstract,art",
  },
];

const Wishlist = () => {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />

      <section className="pt-28 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Your Wishlist</h1>

        {dummyWishlist.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400 py-20">
            <p className="text-xl mb-4">Your wishlist is empty.</p>
            <p>Start adding artworks you love!</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dummyWishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    by {item.artist}
                  </p>
                  <p className="mt-2 text-primary font-bold">{item.price}</p>

                  <div className="flex justify-between items-center mt-4">
                    <button className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm">
                      <HeartOff className="w-4 h-4" />
                      Remove
                    </button>

                    {item.type === "direct" ? (
                      <button className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-opacity-90 flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Buy Now
                      </button>
                    ) : (
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-opacity-90 flex items-center gap-2">
                        <Gavel className="w-4 h-4" />
                        Bid Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
};

export default Wishlist;
