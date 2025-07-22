import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const AddArtworkDirect = () => {
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
      <main className="bg-gray-50 dark:bg-gray-900 text-black dark:text-white min-h-screen pt-24 px-6 md:px-16 pb-10">
        <section className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center">Add Artwork for Direct Sale</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


            {/* Artwork Title */}
            <div>
              <label className="block mb-2 font-medium">Art Name</label>
              <input
                type="text"
                placeholder="Enter artwork name"
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block mb-2 font-medium">Price (INR)</label>
              <input
                type="number"
                placeholder="Enter price"
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            {/* Category */}
            <div>
              <label className="block mb-2 font-medium">Category</label>
              <select className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 outline-none">
                <option value="">Select category</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Size */}
            <div>
              <label className="block mb-2 font-medium">Size</label>
              <select className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 outline-none">
                <option value="">Select size</option>
                {sizes.map((item, i) => (
                  <option key={i} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* Medium */}
            <div>
              <label className="block mb-2 font-medium">Medium</label>
              <select className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 outline-none">
                <option value="">Select medium</option>
                {mediums.map((item, i) => (
                  <option key={i} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* Style */}
            <div>
              <label className="block mb-2 font-medium">Style</label>
              <select className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 outline-none">
                <option value="">Select style</option>
                {styles.map((item, i) => (
                  <option key={i} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* Orientation */}
            <div>
              <label className="block mb-2 font-medium">Orientation</label>
              <select className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 outline-none">
                <option value="">Select orientation</option>
                {orientations.map((item, i) => (
                  <option key={i} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">Description</label>
              <textarea
                rows="4"
                placeholder="Describe your artwork"
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 outline-none"
              ></textarea>
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block mb-2 font-medium">Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedThumbnail(e.target.files[0])}
                className="w-full bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded px-4 py-2"
              />
            </div>

            {/* Other Images Upload */}
            <div>
              <label className="block mb-2 font-medium">Other Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setSelectedImages([...e.target.files])}
                className="w-full bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded px-4 py-2"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 text-center pt-4">
              <button
                type="button"
                className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg font-medium hover:opacity-90 transition"
              >
                Submit Artwork
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AddArtworkDirect;
