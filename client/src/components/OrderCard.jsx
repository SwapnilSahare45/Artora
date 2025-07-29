import { Phone } from "lucide-react";

const OrderCard = ({ order }) => {

    const statusColor = {
        pending: "bg-yellow-100 text-yellow-700",
        processing: "bg-yellow-200 text-yellow-800",
        shipped: "bg-blue-100 text-blue-700",
        delivered: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700",
    };

    const orderDate = new Date(order?.createdAt).toLocaleDateString();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Artwork Details */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 self-start">
                <div className="flex flex-col items-start gap-4">
                    <img
                        src={order?.artwork?.thumbnail}
                        alt={order?.artwork?.title}
                        className="w-full h-auto object-cover rounded-lg"
                    />
                    <div className="w-full">
                        <h2 className="text-xl md:text-2xl font-semibold mb-1">{order?.artwork?.title}</h2>
                        <p className="text-lg font-medium mb-2">₹ {order?.totalAmount}</p>

                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium shadow-sm ${statusColor[order?.status]}`}>
                            {order?.status}
                        </span>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Ordered on: <span className="font-medium">{orderDate}</span>
                        </p>

                        {/* Cancel Order Button */}
                        {["pending", "processing"].includes(order?.status) && (
                            <button
                                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-rose-700 bg-rose-100 rounded-full shadow-sm hover:bg-rose-200 hover:scale-105 transition-transform duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-rose-300"
                            >
                                Cancel Order
                            </button>

                        )}
                    </div>
                </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 self-start">
                <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
                <div className="space-y-1 text-gray-700 dark:text-gray-300">
                    <p className="font-medium text-lg">{order?.shippingAddress?.fullName}</p>
                    <p>{order?.shippingAddress?.address}</p>
                    <p>
                        {order?.shippingAddress?.city}, {order?.shippingAddress?.pinCode}
                    </p>
                    <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{order?.shippingAddress?.phone}</span>
                    </p>
                </div>

                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="text-lg font-semibold mb-1">Payment Method</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 uppercase">
                        {order?.paymentMethod === "cod" ? "COD (Cash on delivery)" : order?.paymentMethod}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default OrderCard