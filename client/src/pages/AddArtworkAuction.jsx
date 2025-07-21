import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const AddArtworkAuction = () => {
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const categories = ["Painting", "Sculpture", "Digital", "Photography", "Other"];
  const sizes = ["Small", "Medium", "Large", "Extra Large", "Custom", "Other"];
  const mediums = ["Oil", "Acrylic", "Watercolor", "Digital", "Mixed Media", "Other"];
  const styles = ["Abstract", "Realism", "Impressionism", "Minimalist", "Contemporary", "Other"];
  const orientations = ["Portrait", "Landscape", "Square", "Panoramic", "Other"];

  return (
    <>
      <Navbar />
      <main className="px-4 py-8 md:px-16 pt-24 bg-gray-50 text-black dark:bg-gray-900 dark:text-white">
        <div className="flex-1 px-4 py-8 md:px-24">
          <h1 className="text-3xl font-bold mb-8 text-center">Add Artwork for Auction</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Auction Name */}
            <div>
              <label className="block mb-1 font-medium">Auction Name</label>
              <input
                type="text"
                placeholder="Enter auction title"
                className="w-full border border-border bg-muted rounded px-4 py-2 outline-none"
              />
            </div>

            {/* Opening Bid */}
            <div>
              <label className="block mb-1 font-medium">Opening Bid</label>
              <input
                type="number"
                placeholder="Enter minimum bid"
                className="w-full border border-border bg-muted rounded px-4 py-2 outline-none"
              />
            </div>

            {/* Art Name */}
            <div>
              <label className="block mb-1 font-medium">Art Name</label>
              <input
                type="text"
                placeholder="Title of the artwork"
                className="w-full border border-border bg-muted rounded px-4 py-2 outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <select className="w-full border border-border bg-muted rounded px-4 py-2 outline-none bg-gray-50 text-black dark:bg-gray-900 dark:text-white">
                <option value="">Select category</option>
                {categories.map((item, idx) => (
                  <option key={idx} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* Size */}
            <div>
              <label className="block mb-1 font-medium">Size</label>
              <select className="w-full border border-border bg-muted rounded px-4 py-2 outline-none bg-gray-50 text-black dark:bg-gray-900 dark:text-white">
                <option value="">Select size</option>
                {sizes.map((item, idx) => (
                  <option key={idx} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* Medium */}
            <div>
              <label className="block mb-1 font-medium">Medium</label>
              <select className="w-full border border-border bg-muted rounded px-4 py-2 outline-none bg-gray-50 text-black dark:bg-gray-900 dark:text-white">
                <option value="">Select medium</option>
                {mediums.map((item, idx) => (
                  <option key={idx} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* Style */}
            <div>
              <label className="block mb-1 font-medium">Style</label>
              <select className="w-full border border-border bg-muted rounded px-4 py-2 outline-none bg-gray-50 text-black dark:bg-gray-900 dark:text-white">
                <option value="">Select style</option>
                {styles.map((item, idx) => (
                  <option key={idx} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* Orientation */}
            <div>
              <label className="block mb-1 font-medium">Orientation</label>
              <select className="w-full border border-border bg-muted rounded px-4 py-2 outline-none bg-gray-50 text-black dark:bg-gray-900 dark:text-white">
                <option value="">Select orientation</option>
                {orientations.map((item, idx) => (
                  <option key={idx} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                rows={4}
                placeholder="Describe your artwork"
                className="w-full border border-border bg-muted rounded px-4 py-2 outline-none"
              ></textarea>
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
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AddArtworkAuction;
