import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AddArtworkDirectSell = () => {
  return (
    <>
      <Navbar />

      <main className="px-4 py-8 md:px-16 pt-24 bg-gray-50 text-black dark:bg-gray-900 dark:text-white">
        <h1 className="text-3xl font-semibold mb-8 text-center">
          Add Artwork (Direct Sell)
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Art Name */}
          <div>
            <label className="block mb-1 text-sm font-medium">Art Name</label>
            <input
              type="text"
              placeholder="Enter art name"
              className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 text-sm font-medium">Price</label>
            <input
              type="number"
              placeholder="Enter price"
              className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 text-sm font-medium">Category</label>
            <select className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-sm">
              <option value="">Select Category</option>
              <option value="painting">Painting</option>
              <option value="sculpture">Sculpture</option>
              <option value="photography">Photography</option>
            </select>
          </div>

          {/* Size */}
          <div>
            <label className="block mb-1 text-sm font-medium">Size</label>
            <select className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-sm">
              <option value="">Select Size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          {/* Medium */}
          <div>
            <label className="block mb-1 text-sm font-medium">Medium</label>
            <select className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-sm">
              <option value="">Select Medium</option>
              <option value="oil">Oil</option>
              <option value="acrylic">Acrylic</option>
              <option value="digital">Digital</option>
            </select>
          </div>

          {/* Style */}
          <div>
            <label className="block mb-1 text-sm font-medium">Style</label>
            <select className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-sm">
              <option value="">Select Style</option>
              <option value="abstract">Abstract</option>
              <option value="realism">Realism</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>

          {/* Orientation */}
          <div>
            <label className="block mb-1 text-sm font-medium">Orientation</label>
            <select className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-sm">
              <option value="">Select Orientation</option>
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
              <option value="square">Square</option>
            </select>
          </div>

           {/* Thumbnail */}
          <div>
            <label className="block mb-1 font-medium">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedThumbnail(e.target.files[0])}
              className="w-full border border-border bg-muted rounded px-4 py-2"
            />
          </div>

          {/* Additional Images */}
          <div>
            <label className="block mb-1 font-medium">Other Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setSelectedImages([...e.target.files])}
              className="w-full border border-border bg-muted rounded px-4 py-2"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">Description</label>
            <textarea
              rows={4}
              placeholder="Enter description..."
              className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
          </div>

          {/* Upload Button */}
          <div className="md:col-span-2 flex justify-end mt-4">
            <button className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition">
              Upload Artwork
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AddArtworkDirectSell;
