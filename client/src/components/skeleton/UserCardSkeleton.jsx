import Skeleton from 'react-loading-skeleton'

const UserCardSkeleton = () => {
    return (
        <div className="bg-white text-black dark:bg-gray-800 dark:text-white rounded-lg p-4 shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
            {/* Avatar */}
            <Skeleton
                width={80}
                height={80}
                circle={true}
                className='mb-3'
            />
            {/* Name */}
            <Skeleton
                width={200}
                height={20}
                className='mb-2'
            />
            {/* Connect Button */}
            <Skeleton
                width={100}
                height={40}
            />
        </div>
    )
}

export default UserCardSkeleton