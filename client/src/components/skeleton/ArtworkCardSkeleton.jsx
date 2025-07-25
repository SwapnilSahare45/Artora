import Skeleton from 'react-loading-skeleton'

const ArtworkCardSkeleton = () => {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            {/* Image Placeholder */}
            <Skeleton height={200} className="rounded-lg mb-4" />

            {/* Title */}
            <Skeleton height={20} width="80%" className="mb-2" />

            {/* Artist Name */}
            <Skeleton height={16} width="60%" className="mb-2" />

            {/* Price / Bid */}
            <Skeleton height={16} width="40%" />
        </div>
    )
}

export default ArtworkCardSkeleton