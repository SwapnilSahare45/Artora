import Skeleton from "react-loading-skeleton";

const ProfileSkeleton = () => {
    return (
        <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8"
        >
            <div
                className="flex items-start sm:items-center gap-6"
            >
                {/* Avatar */}
                <Skeleton
                    width={96}
                    height={96}
                    circle={true}
                />
                <div>
                    {/* Name and Email */}
                    <Skeleton
                        width={200}
                        height={20}
                        className="mb-2"
                    />
                    <Skeleton
                        width={240}
                        count={2}
                    />
                </div>
            </div>

            <div
                className="flex gap-3"
            >
                {/* button */}
                <Skeleton
                    width={100}
                    height={40}
                />
            </div>
        </div>

    )
}

export default ProfileSkeleton