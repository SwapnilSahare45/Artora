import { HeartOff, ShoppingCart, Gavel } from "lucide-react";

const WishlistCard = ({ item, removeHandler }) => {
    return (
        <div
            key={item._id}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow"
        >
            <img
                src={item.artwork?.thumbnail}
                alt={item.artwork?.title}
                className="w-full h-48 object-cover"
            />

            <div className="p-4">
                <h2 className="text-lg font-semibold">{item.artwork?.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    by {item.artwork?.artist}
                </p>
                <p className="mt-2 text-primary font-bold">
                    ₹ {item.artwork?.inAuction ? item.artwork?.currnetBid : item.artwork?.price}
                </p>

                <div className="flex justify-between items-center mt-4">
                    <button
                        className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm"
                        onClick={() => removeHandler()}
                    >
                        <HeartOff className="w-4 h-4" />
                        Remove
                    </button>

                    {!item.artwork?.inAuction ? (
                        <button
                            className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-opacity-90 flex items-center gap-2"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Buy Now
                        </button>
                    ) : (
                        <button
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-opacity-90 flex items-center gap-2"
                        >
                            <Gavel className="w-4 h-4" />
                            Bid Now
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default WishlistCard