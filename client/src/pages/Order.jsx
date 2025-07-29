import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams } from "react-router-dom";
import { useOrderStore } from "../store/orderStore";
import { useEffect } from "react";
import OrderCard from "../components/OrderCard";
import OrderCardSkeleton from "../components/skeleton/OrderCardSkeleton";
import { toast } from "react-toastify";

const Order = () => {
  const { id } = useParams();

  // States from order state
  const { getOrder, order, isLoading, error } = useOrderStore();

  // Fetch order when the component mount or getOrder changes
  useEffect(() => {
    if (id) {
      getOrder(id);
    }
  }, [id, getOrder]);

  // Show an error when component mount or error changes
  useEffect(() => {
   if(error){
    toast.error(error);
   }
  }, [error]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <Navbar />

      <section className="pt-28 pb-16 px-4 md:px-12 lg:px-24 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          Order Summary
        </h1>

        {
          !isLoading ? (
            <OrderCard
              order={order}
            />
          ) : (
            <OrderCardSkeleton />
          )
        }

      </section>

      <Footer />
    </main>
  );
};

export default Order;
