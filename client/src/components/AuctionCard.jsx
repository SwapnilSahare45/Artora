import { Link } from "react-router-dom";

const AuctionCard = ({ id, title, startDate, endDate }) => {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
                Starts: {new Date(startDate).toDateString()}
                <br />
                Ends: {new Date(endDate).toDateString()}
            </p>

            {
                new Date() < new Date(startDate) ? (
                    <p className="text-gray-400">Auction not start yet.</p>
                ) :
                    new Date() > new Date(endDate) ? (
                        <p className="text-gray-400">Auction has ended.</p>
                    ) : (
                        <Link
                            to={`/auction/${id}`}
                            className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
                        >
                            View Auction
                        </Link>
                    )
            }
        </div>
    )
}

export default AuctionCard