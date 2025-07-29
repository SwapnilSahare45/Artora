import React from 'react'
import Skeleton from 'react-loading-skeleton'

const MyArtworkCardSkeleton = () => {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            {/* Image */}
            <Skeleton
                height={160}
                className='mb-3'
            />
            {/* Title */}
            <Skeleton
                width="60%"
                className='mb-2'
            />
            {/* Price */}
            <Skeleton
                width="30%"
                className='mb-2'
            />

            {/* Edit and delete button */}
            <div className="flex justify-end gap-3">
                <Skeleton
                    width={50}
                    height={20}
                />
                <Skeleton
                    width={50}
                    height={20}
                />
            </div>
        </div>
    )
}

export default MyArtworkCardSkeleton