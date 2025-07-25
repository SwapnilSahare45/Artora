import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams } from "react-router-dom";
import { useArtworkStore } from "../store/artworkStore";
import { useEffect, useState } from "react";
import { getFormattedTimeLeft } from "../../utils/getFormattedTimeLeft";
import ArtworkSkeleton from "../components/skeleton/ArtworkSkeleton";

const Artwork = () => {

  const { id } = useParams();

  const { getArtwork, artwork, isLoading, error } = useArtworkStore();

  const [previewImage, setPreviewImage] = useState(null);

  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      await getArtwork(id);
    };
    fetchArtwork();
  }, [id, getArtwork]);

  useEffect(() => {
    if (artwork?.image) {
      setPreviewImage(artwork.image);
    }
  }, [artwork]);

  useEffect(() => {
    if (!artwork?.inAuction && !artwork?.auctionId?.endDate) return;

    const interval = setInterval(() => {
      const time = getFormattedTimeLeft(artwork?.auctionId?.endDate);
      setTimeLeft(time);
    }, 1000);

    return () => clearInterval(interval);
  }, [artwork?.auctionId?.endDate]);

  if (error) {
    return <p>{error}</p>
  }

  return (
    <main className="bg-gray-50 text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <Navbar />

      {
        !isLoading ? (
          <section className="pt-28 pb-12 px-4 md:px-8 lg:px-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Image gallery */}
              <div className="space-y-4">
                {/* Main Image */}
                <img
                  src={previewImage || artwork?.images[0]}
                  alt={artwork?.title}
                  className="w-full h-96 object-cover rounded shadow"
                />

                <div className="flex gap-4">
                  {artwork?.images?.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Preview ${index + 1}`}
                      className={`w-24 h-24 object-cover rounded shadow cursor-pointer ${img === previewImage ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => setPreviewImage(img)}
                    />
                  ))}
                </div>

              </div>

              {/* Artwork Info */}
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">{artwork?.title}</h1>
                <p className="text-lg text-primary font-medium">by {artwork?.artist}</p>

                <div className="space-y-2">
                  <p><span className="font-semibold">Category:</span> {artwork?.category}</p>
                  <p><span className="font-semibold">Medium:</span> {artwork?.medium}</p>
                  <p><span className="font-semibold">Size:</span> {artwork?.size}</p>
                  <p><span className="font-semibold">Style:</span> {artwork?.style}</p>
                  <p><span className="font-semibold">Orientation:</span> {artwork?.orientation}</p>
                </div>

                <p className="text-sm leading-relaxed">{artwork?.description}</p>

                {/* Pricing and CTA */}
                <div className="mt-4 space-y-3">
                  {!artwork?.inAuction ? (
                    <>
                      <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
                        {artwork?.price}
                      </p>
                      <button className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition">
                        Buy Now
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-xl">
                        Current Bid:{artwork?.currnetBid}
                        <span className="font-semibold text-yellow-500 dark:text-yellow-400">
                          {artwork?.bidPrice}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Time Left: {timeLeft || "Calculating..."}
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
        ) : (
          <ArtworkSkeleton />
        )
      }

      <Footer />
    </main>
  );
};

export default Artwork;
