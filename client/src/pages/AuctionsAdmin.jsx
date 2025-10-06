import { useEffect, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import AdminNav from "../components/AdminNav";
import { useAuctionStore } from "../store/auctionStore";

const AuctionsAdmin = () => {
    const { getAuctions, auctions, deleteAuction, isLoading } = useAuctionStore();

    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        getAuctions();
    }, [getAuctions]);

    const filteredAuctions = auctions.filter((a) =>
        a.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this auction?")) {
            await deleteAuction(id);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
            <AdminNav />
            <main className="flex-1 p-4 sm:p-8 pt-24 sm:ml-64">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
                    Auction Management ({filteredAuctions.length})
                </h1>

                {/* Search */}
                <div className="mb-6 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg border dark:border-gray-700">
                    <div className="relative w-full sm:w-1/2">
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search Auctions by Title..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                </div>

                {/* Table View (Desktop) */}
                <div className="hidden md:block overflow-x-auto shadow-xl rounded-lg border border-gray-200 dark:border-gray-700">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                    Start Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                    End Date
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                            {filteredAuctions.length > 0 ? (
                                filteredAuctions.map((auction) => (
                                    <tr
                                        key={auction._id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                                            {auction.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {formatDate(auction.startDate)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {formatDate(auction.endDate)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <button
                                                onClick={() => handleDelete(auction._id)}
                                                className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-6 py-10 text-center text-gray-500 dark:text-gray-400"
                                    >
                                        {isLoading
                                            ? "Loading auctions..."
                                            : "No auctions available."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Card View (Mobile) */}
                <div className="grid gap-4 md:hidden">
                    {filteredAuctions.length > 0 ? (
                        filteredAuctions.map((auction) => (
                            <div
                                key={auction._id}
                                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-md"
                            >
                                <div className="flex justify-between items-center">
                                    <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {auction.title}
                                    </h2>
                                    <button
                                        onClick={() => handleDelete(auction._id)}
                                        className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                    <p>
                                        <span className="font-medium">Start:</span>{" "}
                                        {formatDate(auction.startDate)}
                                    </p>
                                    <p>
                                        <span className="font-medium">End:</span>{" "}
                                        {formatDate(auction.endDate)}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            {isLoading ? "Loading auctions..." : "No auctions available."}
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AuctionsAdmin;
