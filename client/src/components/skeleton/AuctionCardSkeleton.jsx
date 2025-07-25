import Skeleton from "react-loading-skeleton"

const AuctionCardSkeleton = () => {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            {/* Title */}
            <Skeleton height={30} width="92%" className="mb-4" />

            {/* Auction start & end date */}
            <p className="w-1/2 mb-4">
                <Skeleton />
                <Skeleton />
            </p>

            {/* Button */}
            <Skeleton height={40} width="40%" />

        </div>
    )
}

export default AuctionCardSkeleton