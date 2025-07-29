import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrdersCard from "../components/OrdersCard";
import { useOrderStore } from "../store/orderStore";
import { useEffect } from "react";
import OrdersCardSkeleton from "../components/skeleton/OrdersCardSkeleton";
import { toast } from "react-toastify";

const Orders = () => {

  // States from order store
  const { getOrders, orders, isLoading, error } = useOrderStore();

  // Fetch orders when the component mount or getOrders changes
  useEffect(() => {
    getOrders();
  }, [getOrders]);

  // Show an error when component mount or error changes
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);


  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <Navbar />

      <section className="pt-28 pb-16 px-4 md:px-12 lg:px-24">
        <h1 className="text-3xl font-semibold mb-8">Your Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            You haven't placed any orders yet.
          </p>
        ) : (
          <div className="grid gap-6">
            {
              !isLoading ? (
                orders.map((order) => (
                  <OrdersCard
                    key={order._id}
                    order={order}
                  />
                ))
              ) : (
                <>
                  <OrdersCardSkeleton />
                  <OrdersCardSkeleton />
                  <OrdersCardSkeleton />
                </>
              )
            }
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
};

export default Orders;
