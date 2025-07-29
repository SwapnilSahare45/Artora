import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useWishlistStore } from "../store/wishlistStore";
import { useEffect, useState } from "react";
import WishlistCard from "../components/WishlistCard";
import { toast } from "react-toastify";
import WishlistCardSkeleton from "../components/skeleton/WishlistCardSkeleton";


const Wishlist = () => {

  // States from wishlist store
  const { getWishlist, removeFromWishlist, wishlist, isLoading, error } = useWishlistStore();

  // Fetch wishlist when component mount or getWishlist changes
  useEffect(() => {
    getWishlist();
  }, [getWishlist]);

  // State to hold filter wishlist
  const [filterWishlist, setfilterWishlist] = useState([]);
  // Set a wishlist in filterWishlist state when component mount or wishlist changes
  useEffect(() => {
    setfilterWishlist(wishlist);
  }, [wishlist]);

  // Function to handle remove item from wishlist 
  const handleRemoveFromWishlist = async (id) => {
    const success = await removeFromWishlist(id);

    if (success) {
      // When item successfully remove from wishlist show success message and 
      // filter out the wishlist
      toast.success("Artwork remove from wishlist.");
      setfilterWishlist(prev => prev.filter(item => item.artwork?._id !== id));
    }
  };

  // Show an error when component mount or error changes
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />

      <section className="pt-28 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Your Wishlist</h1>

        {filterWishlist.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400 py-20">
            <p className="text-xl mb-4">Your wishlist is empty.</p>
            <p>Start adding artworks you love!</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {
              wishlist && (
                !isLoading ? (
                  filterWishlist.map((item) => (
                    <WishlistCard
                      key={item._id}
                      item={item}
                      removeHandler={() => handleRemoveFromWishlist(item.artwork?._id)}
                    />
                  ))
                ) : (
                  <>
                    <WishlistCardSkeleton />
                    <WishlistCardSkeleton />
                    <WishlistCardSkeleton />
                  </>
                )
              )
            }
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
};

export default Wishlist;