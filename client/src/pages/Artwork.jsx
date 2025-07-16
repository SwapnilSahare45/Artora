import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams } from "react-router-dom";

const Artwork = () => {
  const { id } = useParams();

  // Dummy data — replace with API later
  const artwork = {
    title: "Starry Night",
    artist: "Vincent Van Gogh",
    category: "Painting",
    medium: "Oil on Canvas",
    size: "24in x 36in",
    style: "Post-Impressionism",
    orientation: "Landscape",
    description:
      "An iconic depiction of a swirling night sky over a quiet village, capturing emotion and movement.",
    images: [
      "https://source.unsplash.com/random/800x800?art",
      "https://source.unsplash.com/random/800x800?canvas",
      "https://source.unsplash.com/random/800x800?painting",
    ],
    type: "auction", // or "auction"
    price: "$1,200",
    bidPrice: "$800",
    timeLeft: "2d 6h 14m",
  };

  return (
    <main className="bg-gray-50 text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <Navbar />

      <section className="pt-28 pb-12 px-4 md:px-8 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image gallery */}
          <div className="space-y-4">
            <img
              src={artwork.images[0]}
              alt={artwork.title}
              className="w-full h-96 object-cover rounded shadow"
            />
            <div className="flex gap-4">
              {artwork.images.slice(1).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Preview ${index + 1}`}
                  className="w-24 h-24 object-cover rounded shadow cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Artwork Info */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{artwork.title}</h1>
            <p className="text-lg text-primary font-medium">by {artwork.artist}</p>

            <div className="space-y-2">
              <p><span className="font-semibold">Category:</span> {artwork.category}</p>
              <p><span className="font-semibold">Medium:</span> {artwork.medium}</p>
              <p><span className="font-semibold">Size:</span> {artwork.size}</p>
              <p><span className="font-semibold">Style:</span> {artwork.style}</p>
              <p><span className="font-semibold">Orientation:</span> {artwork.orientation}</p>
            </div>

            <p className="text-sm leading-relaxed">{artwork.description}</p>

            {/* Pricing and CTA */}
            <div className="mt-4 space-y-3">
              {artwork.type === "direct" ? (
                <>
                  <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
                    {artwork.price}
                  </p>
                  <button className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition">
                    Buy Now
                  </button>
                </>
              ) : (
                <>
                  <p className="text-xl">
                    Current Bid:{" "}
                    <span className="font-semibold text-yellow-500 dark:text-yellow-400">
                      {artwork.bidPrice}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Time Left: {artwork.timeLeft}
                  </p>
                  <button className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition">
                    Place Bid
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Artwork;
