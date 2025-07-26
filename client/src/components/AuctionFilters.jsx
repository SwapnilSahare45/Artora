const FilterSection = ({ title, options }) => (
  <div
    className="mb-6"
  >
    <h3
      className="text-sm font-semibold mb-2 px-4"
    >
      {title}
    </h3>
    <ul
      className="flex flex-wrap space-x-4 space-y-2 text-sm"
    >
      {options.map((item) => (
        <li
          key={item}
          className="px-4"
        >
          <label
            className="inline-flex items-center gap-2"
          >
            <input
              type="checkbox"
              className="form-checkbox accent-black dark:accent-white"
            />
            {item}
          </label>
        </li>
      ))}
    </ul>
  </div>
);

const AuctionFilters = () => {
  return (
    <div
      className="h-full overflow-y-scroll bg-white shadow dark:bg-gray-800 dark:text-white w-full rounded"
    >
      <h2
        className="text-lg font-semibold mb-4 sticky top-0 bg-white dark:bg-gray-800 py-4 text-center shadow"
      >
        Auction Filters
      </h2>

      <FilterSection
        title="Category"
        options={["Painting", "Sculpture", "Digital", "Photography", "Other"]}
      />

      <FilterSection
        title="Medium"
        options={["Oil", "Acrylic", "Watercolor", "Digital", "Mixed Media", "Other"]}
      />

      <FilterSection
        title="Style"
        options={["Abstract", "Realism", "Impressionism", "Minimalist", "Contemporary", "Other"]}
      />

      <FilterSection
        title="Size"
        options={["Small", "Medium", "Large", "Extra Large", "Custom", "Other"]}
      />

      <FilterSection
        title="Orientation"
        options={["Portrait", "Landscape", "Square", "Panoramic", "Other"]}
      />

      <div
        className="mb-6 px-4"
      >
        <h3
          className="text-sm font-semibold mb-2"
        >
          Bid Range
        </h3>
        <input
          type="range"
          min="1000"
          max="100000"
          className="w-full accent-black dark:accent-white"
        />
        <div
          className="flex justify-between text-xs mt-1"
        >
          <span>
            ₹1K
          </span>
          <span>
            ₹100K
          </span>
        </div>
      </div>

      <FilterSection
        title="Auction Status"
        options={['Live', 'Upcoming', 'Ended']}
      />
    </div>
  );
};

export default AuctionFilters;