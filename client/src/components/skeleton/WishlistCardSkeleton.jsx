import Skeleton from "react-loading-skeleton";

const WishlistCardSkeleton = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
            {/* Image */}
            <Skeleton height={192} />

            <div className="p-4">
                {/* Title */}
                <Skeleton width="70%" />
                {/* Artist */}
                <Skeleton width="50%" />
                {/* Price */}
                <Skeleton width="40%" />

                {/* Buttons */}
                <div className="flex justify-between items-center mt-4">
                    <Skeleton width={100} height={20} />
                    <Skeleton width={100} height={30} />
                </div>
            </div>
        </div>
    )
}

export default WishlistCardSkeleton