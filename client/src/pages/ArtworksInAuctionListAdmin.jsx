import { Trash2, Search, Gavel } from "lucide-react";
import AdminNav from "../components/AdminNav";
import { useAdminStore } from "../store/adminStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StatusPill = ({ sold }) => {
    const text = sold ? "Sold" : "Listed";
    const baseClasses =
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium";

    const colorClasses = sold
        ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
        : "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";

    return <span className={`${baseClasses} ${colorClasses}`}>{text}</span>;
};

const ArtworksInAuctionListAdmin = () => {
    const { getArtworksInAuction, artworks, deleteArtwork } = useAdminStore();
    const [inputSearch, setInputSearch] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            getArtworksInAuction(inputSearch);
        }, 500);
        return () => clearTimeout(handler);
    }, [inputSearch, getArtworksInAuction]);

    const handleDelete = (artworkId) => {
        if (
            window.confirm(
                "Are you sure you want to delete this auction item? This will remove the artwork from the auction."
            )
        ) {
            deleteArtwork(artworkId);
        }
    };

    // Format end date
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
            <AdminNav />

            <main className="flex-1 p-1 sm:p-6 md:p-8 pt-24 md:ml-64">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Auction Management ({artworks.length} Items)
                </h1>

                <div className="space-y-6">

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-3 sm:p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md border dark:border-gray-700">
                        <div className="relative w-11/12 sm:w-1/3">
                            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search auctions by title or artist..."
                                value={inputSearch}
                                onChange={(e) => setInputSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                            />
                        </div>

                        <Link
                            to="/admin/add-auction"
                            className="flex items-center w-11/12 sm:w-auto justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-150 text-sm font-medium"
                        >
                            <Gavel className="w-4 h-4 mr-2" />
                            Create New Auction
                        </Link>
                    </div>

                    {/* ===== Desktop Table View ===== */}
                    <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-100 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Auction Item
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Current Bid
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        End Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                                {artworks.length > 0 ? (
                                    artworks.map((artwork) => (
                                        <tr
                                            key={artwork._id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                        >
                                            {/* Item */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <img
                                                        className="h-10 w-10 rounded object-cover"
                                                        src={artwork.thumbnail}
                                                        alt={artwork.title}
                                                    />
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {artwork.title}
                                                        </div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            By: {artwork.artist} |{" "}
                                                            {artwork.auctionId?.title} | Start: ₹{" "}
                                                            {artwork.openingBid?.toFixed(2) || "N/A"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Bid */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary dark:text-primary-light">
                                                ₹ {artwork.currnetBid?.toFixed(2) || "N/A"}
                                            </td>

                                            {/* End Date */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {formatDate(artwork.auctionId?.endDate)}
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusPill sold={artwork.sold} />
                                            </td>

                                            {/* Action */}
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                <button
                                                    onClick={() => handleDelete(artwork._id)}
                                                    className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-6 py-10 text-center text-gray-500 dark:text-gray-400"
                                        >
                                            {inputSearch
                                                ? `No auctions found matching "${inputSearch}".`
                                                : "No auctions available."}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* ===== Mobile List View ===== */}
                    <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
                        {artworks.length > 0 ? (
                            artworks.map((artwork) => (
                                <div
                                    key={artwork._id}
                                    className="flex items-center gap-3"
                                >
                                    {/* Thumbnail */}
                                    <img
                                        src={artwork.thumbnail}
                                        alt={artwork.title}
                                        className="h-12 w-12 rounded object-cover flex-shrink-0"
                                    />

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                            {artwork.title}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            By {artwork.artist} | {artwork.auctionId?.title}
                                        </p>
                                        <p className="text-sm text-primary dark:text-primary-light mt-0.5">
                                            ₹ {artwork.currnetBid?.toFixed(2) || "N/A"}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1 text-xs">
                                            <span className="text-gray-500 dark:text-gray-400">
                                                Ends: {formatDate(artwork.auctionId?.endDate)}
                                            </span>
                                            <StatusPill sold={artwork.sold} />
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <button
                                        onClick={() => handleDelete(artwork._id)}
                                        className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 transition-colors p-1 flex-shrink-0"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                                {inputSearch
                                    ? `No auctions found matching "${inputSearch}".`
                                    : "No auctions available."}
                            </div>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ArtworksInAuctionListAdmin;
