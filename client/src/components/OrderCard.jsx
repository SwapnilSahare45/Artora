const OrderCard = ({ order }) => {
  return (
    <div
      className="flex items-start gap-4 p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700"
    >
      <img
        src={order.image}
        alt={order.title}
        className="w-24 h-24 object-cover rounded"
      />
      <div
        className="flex-1"
      >
        <h3
          className="text-md font-semibold"
        >
          {order.title}
        </h3>
        <p
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          by {order.artist}
        </p>
        <p
          className="text-sm mt-1"
        >
          Price: ${order.price}
        </p>
        <p
          className="text-xs text-gray-500 mt-1"
        >
          Ordered on {new Date(order.date).toLocaleDateString()}
        </p>
        <span
          className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${order.status === "Delivered"
              ? "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-300"
              : order.status === "Pending"
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-300"
                : "bg-red-100 text-red-700 dark:bg-red-700/20 dark:text-red-300"
            }`}
        >
          {order.status}
        </span>
      </div>
    </div>
  );
};

export default OrderCard;
