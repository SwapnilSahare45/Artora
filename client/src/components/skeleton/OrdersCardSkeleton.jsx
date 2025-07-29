import Skelton from "react-loading-skeleton";

const OrdersCardSkeleton = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 transition hover:shadow-md">

            <div className="flex gap-4 w-full md:w-auto">
                {/* Image */}
                <Skelton height={96} width={96} />

                <div className="flex flex-col justify-between">
                    {/* Title */}
                    <Skelton width={260} />
                    {/* Order data */}
                    <Skelton width={160} />
                    {/* Price */}
                    <Skelton width={100} />
                </div>
            </div>

            <div className="flex flex-col items-start md:items-end justify-between gap-3 w-full md:w-auto">
                {/* Status */}
                <Skelton width={70} />
                <Skelton width={100} />
            </div>

        </div>
    )
}

export default OrdersCardSkeleton