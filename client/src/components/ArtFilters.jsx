import { useState } from 'react';

const FilterSection = ({ title, options, name, selectedValue, onChange }) => (
  <div className="mb-6">
    <h3 className="text-sm font-semibold mb-2 px-4">{title}</h3>
    <ul className="grid grid-cols-2 md:grid-cols-1 space-x-4 space-y-2 text-sm lg:grid-cols-2">
      {options.map((item) => (
        <li key={item} className="px-4">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name={name}
              className="form-radio accent-black dark:accent-white"
              value={item}
              checked={selectedValue === item}
              onChange={() => onChange(name, item)}
            />
            {item}
          </label>
        </li>
      ))}
    </ul>
  </div>
);

const ArtFilters = ({ onFilterChange, inAuction }) => {
  const [filters, setFilters] = useState({
    category: '',
    size: '',
    medium: '',
    style: '',
    orientation: '',
    availability: '',
    priceMin: 50,
    priceMax: 100000,
  });

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (e) => {
    const newMax = parseInt(e.target.value);
    const newFilters = { ...filters, priceMax: newMax };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="h-full grid overflow-y-scroll md:overflow-y-hidden pb-2 bg-white shadow dark:bg-gray-800 dark:text-white w-full rounded">
      <h2 className="text-lg font-semibold mb-4 sticky top-0 bg-white dark:bg-gray-800 py-4 text-center shadow">
        Filters
      </h2>

      <FilterSection
        title="Category"
        name="category"
        options={["Painting", "Sculpture", "Digital", "Photography", "Other"]}
        selectedValue={filters.category}
        onChange={handleFilterChange}
      />

      <FilterSection
        title="Size"
        name="size"
        options={["Small", "Medium", "Large", "Extra Large", "Custom", "Other"]}
        selectedValue={filters.size}
        onChange={handleFilterChange}
      />

      <FilterSection
        title="Medium"
        name="medium"
        options={["Oil", "Acrylic", "Watercolor", "Digital", "Mixed Media", "Other"]}
        selectedValue={filters.medium}
        onChange={handleFilterChange}
      />
      {
        !inAuction && (
          <div className="mb-6 px-4">
            <h3 className="text-sm font-semibold mb-2">Price Range</h3>
            <input
              type="range"
              min="50"
              max="100000"
              step="50"
              value={filters.priceMax}
              onChange={handlePriceChange}
              className="w-full accent-black dark:accent-white"
            />
            <div className="flex justify-between text-xs mt-1">
              <span>₹{filters.priceMin}</span>
              <span>₹{filters.priceMax}</span>
            </div>
          </div>
        )
      }
      
      <FilterSection
        title="Style"
        name="style"
        options={["Abstract", "Realism", "Impressionism", "Minimalist", "Contemporary", "Other"]}
        selectedValue={filters.style}
        onChange={handleFilterChange}
      />

      <FilterSection
        title="Orientation"
        name="orientation"
        options={["Portrait", "Landscape", "Square", "Panoramic", "Other"]}
        selectedValue={filters.orientation}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default ArtFilters;
