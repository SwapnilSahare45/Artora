import Skeleton from "react-loading-skeleton";

const OrderCardSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 self-start">
                <div className="flex flex-col items-start gap-4">
                    <div className="w-full">
                        {/* Image */}
                        <Skeleton height={100} />
                    </div>
                    <div className="w-full">
                        {/* Title */}
                        <Skeleton width="70%" className="mb-1" />
                        {/* Price */}
                        <Skeleton width="30%" className="mb-2" />
                        {/* Status */}
                        <Skeleton width="20%" height={30} />
                        {/* Order data */}
                        <Skeleton width="40%" className="mt-2" />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 self-start">
                {/* Shipping Address */}
                <Skeleton width="40%" height={20} className="mb-4" />
                <div className="space-y-1 text-gray-700 dark:text-gray-300">
                    <Skeleton width="20%" />
                    <Skeleton width="26%" />
                    <Skeleton width="32%" />
                    <Skeleton width="30%" />
                </div>

                {/* Payment method */}
                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <Skeleton width="36%" />
                    <Skeleton width="40%" />
                </div>
            </div>
        </div>
    )
}

export default OrderCardSkeleton