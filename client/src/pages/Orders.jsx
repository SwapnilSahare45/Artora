import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const orders = [
  {
    id: 1,
    title: "Mystic Sunrise",
    price: "$850",
    date: "July 12, 2025",
    thumbnail: "https://via.placeholder.com/100x100.png?text=Art",
    status: "Delivered",
  },
  {
    id: 2,
    title: "Urban Dreams",
    price: "$1,200",
    date: "July 10, 2025",
    thumbnail: "https://via.placeholder.com/100x100.png?text=Art",
    status: "In Transit",
  },
  {
    id: 3,
    title: "Galaxy Bloom",
    price: "$650",
    date: "July 5, 2025",
    thumbnail: "https://via.placeholder.com/100x100.png?text=Art",
    status: "Cancelled",
  },
];

const statusColor = {
  Delivered: "text-green-600",
  "In Transit": "text-yellow-500",
  Cancelled: "text-red-500",
};

const Orders = () => {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <Navbar />

      <section className="pt-28 pb-16 px-4 md:px-12 lg:px-24">
        <h1 className="text-3xl font-semibold mb-6">Your Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            You haven't placed any orders yet.
          </p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col md:flex-row gap-4 md:items-center justify-between dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow"
              >
                {/* Artwork Thumbnail */}
                <div className="flex gap-4">
                  <img
                    src={order.thumbnail}
                    alt={order.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex flex-col justify-between">
                    <h2 className="text-xl font-medium">{order.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Ordered on: {order.date}
                    </p>
                    <p className="text-lg font-semibold">{order.price}</p>
                  </div>
                </div>

                {/* Status and Action */}
                <div className="flex flex-col items-start md:items-end justify-between gap-2">
                  <span
                    className={`text-sm font-medium ${statusColor[order.status]}`}
                  >
                    {order.status}
                  </span>
                  <Link
                    to={`/order/${order.id}`}
                    className="text-primary hover:underline text-sm"
                  >
                    View Details
                  </Link>
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

export default Orders;
