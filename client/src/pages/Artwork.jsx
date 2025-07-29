import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useArtworkStore } from "../store/artworkStore";
import { useEffect, useState } from "react";
import { getFormattedTimeLeft } from "../../utils/getFormattedTimeLeft";
import ArtworkSkeleton from "../components/skeleton/ArtworkSkeleton";
import { useWishlistStore } from "../store/wishlistStore";
import { toast } from "react-toastify";

const Artwork = () => {

  // Extract the id parameter from the URL
  const { id } = useParams();

  // States from artwork store
  const { getArtwork, artwork, isLoading, error: artworkError } = useArtworkStore();

  // State to hold preview image 
  const [previewImage, setPreviewImage] = useState(null);

  // State to hold time left for auction
  const [timeLeft, setTimeLeft] = useState(null);

  // Fetch artwork when component mount or when artwork id changes
  useEffect(() => {
    if (id) {
      getArtwork(id);
    }
  }, [id, getArtwork]);

  // Set a preview image when component mount or when artwork changes
  useEffect(() => {
    if (artwork?.image) {
      setPreviewImage(artwork.image);
    }
  }, [artwork]);

  // Set the formatted date when component mount or when artwork changes
  useEffect(() => {
    if (!artwork?.inAuction && !artwork?.auctionId?.endDate) return;

    const interval = setInterval(() => {
      const time = getFormattedTimeLeft(artwork?.auctionId?.endDate);
      setTimeLeft(time);
    }, 1000);

    return () => clearInterval(interval);
  }, [artwork?.auctionId?.endDate]);

  // States from wishlist store
  const { addToWishlist, getWishlist, removeFromWishlist, wishlist, error: wishlistError } = useWishlistStore();

  // Fetch the wishlist when component mount or when getWishlist changes
  useEffect(() => {
    getWishlist();
  }, [getWishlist]);

  // State to hold boolean value for is in wishlist
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Check is in wishlist when component mount or wishlist or id changes
  useEffect(() => {
    const found = wishlist?.some(item => item.artwork === id);
    setIsInWishlist(found);
  }, [wishlist, id])

  // Toggle functon to handle add and remove artwork from wishlist
  const handleWishlistToggle = async (id) => {
    setIsInWishlist(prev => !prev);

    const result = isInWishlist
      ? await removeFromWishlist(id)
      : await addToWishlist(id);

    if (!result.success) {
      setIsInWishlist(prev => !prev);
      toast.error("Something went wrong.");
    } else {
      toast.success(isInWishlist ? "Artwork remove from your wishlist." : "Artwork added to your wishlist.");
    }
  }

  // Show an error when component mount or when artwork error or wishlist error changes
  useEffect(() => {
    if (artworkError || wishlistError) {
      toast.error(artworkError || wishlistError);
    }
  }, [artworkError, wishlistError]);


  return (
    <main className="bg-gray-50 text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <Navbar />

      {/* Conditional rendering for loading state */}
      {
        !isLoading ? (
          <section className="pt-28 pb-12 px-4 md:px-8 lg:px-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Image gallery */}
              <div className="space-y-4 relative">
                {/* Wishlist button */}
                <button
                  className="absolute right-4 top-4 cursor-pointer"
                  onClick={() => handleWishlistToggle(artwork?._id)}
                >
                  <Heart
                    fill={isInWishlist ? '#ef4444' : 'none'}
                    strokeWidth={1.5}
                    className="w-8 h-8"
                  />
                </button>
                {/* Main Image */}
                <img
                  src={previewImage || artwork?.images[0]}
                  alt={artwork?.title}
                  className="w-full h-96 object-center rounded shadow"
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
                <h1 className="text-3xl font-bold">
                  {artwork?.title}
                </h1>
                <p className="text-lg text-primary font-medium">
                  by {artwork?.artist}
                </p>

                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">
                      Category:
                    </span>
                    {artwork?.category}
                  </p>
                  <p>
                    <span className="font-semibold">
                      Medium:
                    </span>
                    {artwork?.medium}
                  </p>
                  <p>
                    <span className="font-semibold">
                      Size:
                    </span>
                    {artwork?.size}
                  </p>
                  <p>
                    <span className="font-semibold">
                      Style:
                    </span>
                    {artwork?.style}
                  </p>
                  <p>
                    <span className="font-semibold">
                      Orientation:
                    </span>
                    {artwork?.orientation}
                  </p>
                </div>

                <p className="text-sm leading-relaxed">
                  {artwork?.description}
                </p>

                {/* Pricing and CTA */}
                <div className="mt-4 space-y-3">
                  {/* Conditional redering for Auction */}
                  {!artwork?.inAuction ? (
                    // If not in auction then show price and buy button
                    <>
                      <p className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-4" >
                        ₹ {artwork?.price}
                      </p>
                      <Link
                        to={`/place-order/${artwork?._id}`}
                        className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition"
                      >
                        Buy Now
                      </Link>
                    </>
                  ) : (
                    <>
                      {/* If it is in auction the show current bid time left and place bid button */}
                      <p className="text-xl">
                        Current Bid: ₹ {artwork?.currnetBid}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Time Left: {timeLeft || "Calculating..."}
                      </p>

                      <button
                        className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition"
                      >
                        Place Bid
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        ) : (
          // If is loading show the artwork skeleton
          <ArtworkSkeleton />
        )
      }

      <Footer />
    </main>
  );
};

export default Artwork;