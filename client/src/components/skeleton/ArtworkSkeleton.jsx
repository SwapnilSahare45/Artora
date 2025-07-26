import Skeleton from "react-loading-skeleton"

const ArtworkSkeleton = () => {
  return (
    <div
      className="pt-28 pb-12 px-4 md:px-8 lg:px-24"
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-10"
      >

        {/* Image gallery */}
        <div
          className="space-y-4"
        >
          {/* Main image */}
          <Skeleton
            height={384}
            width="100%"
          />

          {/* Other images */}
          <div
            className="flex gap-4"
          >
            <Skeleton
              width={96}
              height={96}
            />
            <Skeleton
              width={96}
              height={96}
            />
            <Skeleton
              width={96}
              height={96}
            />
            <Skeleton
              width={96}
              height={96}
            />
            <Skeleton
              width={96}
              height={96}
            />
          </div>
        </div>

        {/* Artwork info */}
        <div
          className="space-y-4"
        >
          <Skeleton
            width="70%"
            height={30}
            className="mb-4"
          />
          <Skeleton
            width="30%"
            className="mb-4"
          />

          <div
            className="space-y-2"
          >
            <Skeleton
              width="45%"
            />
            <Skeleton
              width="45%"
            />
            <Skeleton
              width="45%"
            />
            <Skeleton
              width="45%"
            />
            <Skeleton
              width="45%"
            />
          </div>

          {/* <Description */}
          <Skeleton
            width="90%"
            count={3}
          />
          <Skeleton
            width="20%"
          />

          {/* Price & Button */}
          <div
            className="mt-4 space-y-3"
          >
            <Skeleton
              width="35%"
            />
            <Skeleton
              width="30%"
              height={40}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtworkSkeleton