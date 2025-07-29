import { Link } from "react-router-dom";

const OrdersCard = ({ order }) => {
    const statusColor = {
        pending: "bg-gray-100 text-gray-700",
        processing: "bg-yellow-100 text-yellow-700",
        shipped: "bg-blue-100 text-blue-700",
        delivered: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700",
    };

    const orderDate = new Date(order.createdAt).toLocaleDateString();
    return (
        <div
            key={order?._id}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 transition hover:shadow-md"
        >
            {/* Left side: image + title + details */}
            <div className="flex gap-4 w-full md:w-auto">
                <img
                    src={order.artwork?.thumbnail}
                    alt={order.artwork?.title}
                    className="w-24 h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                />
                <div className="flex flex-col justify-between">
                    <h2 className="text-xl font-semibold">{order.artwork?.title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                        Ordered on: {orderDate}
                    </p>
                    <p className="text-lg font-semibold mt-1">₹ {order.totalAmount}</p>
                </div>
            </div>

            {/* Right side: status + link */}
            <div className="flex flex-col items-start md:items-end justify-between gap-3 w-full md:w-auto">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusColor[order.status]}`}>
                    {order.status}
                </span>
                <Link
                    to={`/order/${order._id}`}
                    className="text-primary hover:underline text-sm font-medium"
                >
                    View Details →
                </Link>
            </div>
        </div>
    )
}

export default OrdersCard