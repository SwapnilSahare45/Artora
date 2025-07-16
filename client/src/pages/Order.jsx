import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams } from "react-router-dom";

const dummyOrder = {
  id: 1,
  title: "Mystic Sunrise",
  price: "$850",
  date: "July 12, 2025",
  status: "Delivered",
  thumbnail: "https://via.placeholder.com/300x300.png?text=Art",
  address: {
    name: "John Doe",
    street: "123 Art Lane",
    city: "New York",
    state: "NY",
    zip: "10001",
    phone: "+1 123 456 7890",
  },
};

const statusColor = {
  Delivered: "text-green-600",
  "In Transit": "text-yellow-500",
  Cancelled: "text-red-500",
};

const Order = () => {
  const { id } = useParams();

  // Replace with actual order fetch logic
  const order = dummyOrder;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <Navbar />

      <section className="pt-28 pb-16 px-4 md:px-12 lg:px-24 max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Order #{id}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Artwork Preview */}
          <div className="bg-white shadow dark:bg-gray-800 rounded-lg p-4">
            <img
              src={order.thumbnail}
              alt={order.title}
              className="w-full h-auto object-cover rounded"
            />
            <h2 className="text-2xl font-medium mt-4">{order.title}</h2>
            <p className="text-lg font-semibold mt-2">{order.price}</p>
            <p
              className={`mt-2 text-sm font-medium ${statusColor[order.status]}`}
            >
              Status: {order.status}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Ordered on: {order.date}
            </p>
          </div>

          {/* Shipping Info */}
          <div className="bg-white shadow dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
            <p className="mb-1 font-medium">{order.address.name}</p>
            <p className="text-gray-700 dark:text-gray-300">
              {order.address.street},<br />
              {order.address.city}, {order.address.state} {order.address.zip}
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Phone: {order.address.phone}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Order;
