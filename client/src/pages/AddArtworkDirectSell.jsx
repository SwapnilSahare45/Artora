import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useRef, useState } from "react";
import { useArtworkStore } from "../store/artworkStore";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const AddArtworkDirect = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  // Get the states from artwork store
  const { addArtwork, getArtwork, updateArtwork, artwork, isLoading, error } = useArtworkStore();

  // Fetch the artwork details when component mount or when artwork id changes.
  // Used when artwork update
  useEffect(() => {
    if (id) {
      getArtwork(id);
    }
  }, [id, getArtwork]);

  // State to hold artwork data
  const [artworkData, setArtworkData] = useState({ title: '', artist: '', price: '', category: '', size: '', medium: '', style: '', orientation: '', description: '' });

  // Pre-fill the artworkData state using existing artwork
  useEffect(() => {
    if (artwork) {
      setArtworkData({
        title: artwork.title || "",
        artist: artwork.artist || "",
        price: artwork.price || "",
        category: artwork.category || "",
        size: artwork.size || "",
        medium: artwork.medium || "",
        style: artwork.style || "",
        orientation: artwork.orientation || "",
        description: artwork.description || "",
      });
    }
  }, [artwork])

  // To hold reference of thumbnail and images
  const thumbnailRef = useRef(null);
  const imagesRef = useRef(null);

  // State to hold thumbnail and artwork images
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  // State to hold validation error
  const [errors, setErrors] = useState({ title: '', artist: '', price: '', category: '', size: '', medium: '', style: '', orientation: '', description: '', thumbnail: '', images: '' });

  // Options
  const categories = ["Painting", "Sculpture", "Digital", "Photography", "Other"];
  const sizes = ["Small", "Medium", "Large", "Extra Large", "Custom", "Other"];
  const mediums = ["Oil", "Acrylic", "Watercolor", "Digital", "Mixed Media", "Other"];
  const styles = ["Abstract", "Realism", "Impressionism", "Minimalist", "Contemporary", "Other"];
  const orientations = ["Portrait", "Landscape", "Square", "Panoramic", "Other"];

  // Function to handle add artwork
  const handleAddArtwork = async () => {
    // Object to store validation error
    const newErrors = { title: '', artist: '', price: '', category: '', size: '', medium: '', style: '', orientation: '', description: '', thumbnail: '', images: '' };

    // Validation
    if (!artworkData.title.trim()) newErrors.title = "Artwork title required.";
    if (!artworkData.artist.trim()) newErrors.artist = "Artwork artist required.";
    if (!artworkData.price.trim()) {
      newErrors.price = "Price required.";
    } else if (artworkData.price < 0) {
      newErrors.price = "Price must be greater than 0.";
    }
    if (!artworkData.category.trim()) newErrors.category = "Category required.";
    if (!artworkData.size.trim()) newErrors.size = "Artwork size required.";
    if (!artworkData.medium.trim()) newErrors.medium = "Medium required.";
    if (!artworkData.style.trim()) newErrors.style = "Artwork style required.";
    if (!artworkData.orientation.trim()) newErrors.orientation = "Artwork orientation required.";
    if (!artworkData.description.trim()) newErrors.description = "Description required.";
    if (!selectedThumbnail) newErrors.thumbnail = "Artwork thumbnail is required.";
    if (!selectedImages || selectedImages.length === 0) {
      newErrors.images = "At least one artwork image is required.";
    } else if (selectedImages.length > 8) {
      newErrors.images = "You can upload up to 8 images only.";
    }

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e);
    if (hasError) return;

    // Append the data
    const data = new FormData();
    data.append('title', artworkData.title);
    data.append('artist', artworkData.artist);
    data.append('price', artworkData.price);
    data.append('category', artworkData.category);
    data.append('size', artworkData.size);
    data.append('medium', artworkData.medium);
    data.append('style', artworkData.style);
    data.append('orientation', artworkData.orientation);
    data.append('description', artworkData.description);
    data.append('thumbnail', selectedThumbnail);
    // Append images one-by-one under the same key
    selectedImages.forEach((img) => {
      data.append("images", img);
    });

    const { success } = await addArtwork(data);

    if (success) {

      toast.success("Artwork added successfully.");

      // Clear artwork data state
      setArtworkData({ title: '', artist: '', price: '', category: '', size: '', medium: '', style: '', orientation: '', description: '' });

      // Clear file inputs using ref
      if (thumbnailRef.current) thumbnailRef.current.value = '';
      if (imagesRef.current) thumbnailRef.current.value = '';

      // Clear state of thumbnail and images
      setSelectedThumbnail(null);
      setSelectedImages(null);
    }
  }

  // Function to handle update artwork
  const handleUpdateArtwork = async () => {
    // Append the data
    const data = new FormData();
    data.append('title', artworkData.title);
    data.append('artist', artworkData.artist);
    data.append('price', artworkData.price);
    data.append('category', artworkData.category);
    data.append('size', artworkData.size);
    data.append('medium', artworkData.medium);
    data.append('style', artworkData.style);
    data.append('orientation', artworkData.orientation);
    data.append('description', artworkData.description);
    data.append('thumbnail', selectedThumbnail);
    // Append images one-by-one under the same key
    selectedImages.forEach((img) => {
      data.append("images", img);
    });

    const { success } = await updateArtwork(id, data);
    if (success) {
      toast.success("Artwork updated successfully.");
      navigate("/profile")
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 dark:bg-gray-900 text-black dark:text-white min-h-screen pt-20 md:pt-24 px-4 md:px-16 pb-10">

        {/* Form secton */}
        <section className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg">
          <h1 className="text-xl md:text-3xl font-bold mb-8 text-center">
            Add Artwork for Direct Sale
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Artwork Title */}
            <div>
              <label className="block mb-2 font-medium">Art Name</label>
              <input
                type="text"
                placeholder="Enter artwork name"
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                value={artworkData.title || artwork?.title}
                onChange={(e) => setArtworkData({ ...artworkData, title: e.target.value })}
              />
              {errors.title && <p className="text-red-500 text-sm pl-2 mt-1">{errors.title}</p>}
            </div>

            {/* Artist */}
            <div>
              <label className="block mb-2 font-medium">Artist</label>
              <input
                type="text"
                placeholder="Enter artist name"
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                value={artworkData.artist || artwork?.artist}
                onChange={(e) => setArtworkData({ ...artworkData, artist: e.target.value })}
              />
              {errors.artist && <p className="text-red-500 text-sm pl-2 mt-1">{errors.artist}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="block mb-2 font-medium">Price (INR)</label>
              <input
                type="number"
                placeholder="Enter price"
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                value={artworkData.price || artwork?.price}
                onChange={(e) => setArtworkData({ ...artworkData, price: e.target.value })}
              />
              {errors.price && <p className="text-red-500 text-sm pl-2 mt-1">{errors.price}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 font-medium">Category</label>
              <select
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 outline-none"
                value={artworkData.category || artwork?.category}
                onChange={(e) => setArtworkData({ ...artworkData, category: e.target.value })}
              >
                <option value="">
                  Select category
                </option>
                {categories.map((cat, i) => (
                  <option
                    key={i}
                    value={cat}
                  >
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm pl-2 mt-1">{errors.category}</p>}
            </div>

            {/* Size */}
            <div>
              <label className="block mb-2 font-medium">Size</label>
              <select
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 outline-none"
                value={artworkData.size || artwork?.size}
                onChange={(e) => setArtworkData({ ...artworkData, size: e.target.value })}
              >
                <option value="">
                  Select size
                </option>
                {sizes.map((item, i) => (
                  <option
                    key={i}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
              {errors.size && <p className="text-red-500 text-sm pl-2 mt-1">{errors.size}</p>}
            </div>

            {/* Medium */}
            <div>
              <label className="block mb-2 font-medium">Medium</label>
              <select
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 outline-none"
                value={artworkData.medium || artwork?.medium}
                onChange={(e) => setArtworkData({ ...artworkData, medium: e.target.value })}
              >
                <option value="">
                  Select medium
                </option>
                {mediums.map((item, i) => (
                  <option
                    key={i}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
              {errors.medium && <p className="text-red-500 text-sm pl-2 mt-1">{errors.medium}</p>}
            </div>

            {/* Style */}
            <div>
              <label className="block mb-2 font-medium">Style</label>
              <select
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 outline-none"
                value={artworkData.style || artwork?.style}
                onChange={(e) => setArtworkData({ ...artworkData, style: e.target.value })}
              >
                <option value="">
                  Select style
                </option>
                {styles.map((item, i) => (
                  <option
                    key={i}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
              {errors.style && <p className="text-red-500 text-sm pl-2 mt-1">{errors.style}</p>}
            </div>

            {/* Orientation */}
            <div>
              <label className="block mb-2 font-medium">Orientation</label>
              <select
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 outline-none"
                value={artworkData.orientation || artwork?.orientation}
                onChange={(e) => setArtworkData({ ...artworkData, orientation: e.target.value })}
              >
                <option value="">
                  Select orientation
                </option>
                {orientations.map((item, i) => (
                  <option
                    key={i}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
              {errors.orientation && <p className="text-red-500 text-sm pl-2 mt-1">{errors.orientation}</p>}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">Description</label>
              <textarea
                rows="4"
                placeholder="Describe your artwork"
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 outline-none"
                value={artworkData.description || artwork?.description}
                onChange={(e) => setArtworkData({ ...artworkData, description: e.target.value })}
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm pl-2 mt-1">{errors.description}</p>}
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block mb-2 font-medium">Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                ref={thumbnailRef}
                onChange={(e) => setSelectedThumbnail(e.target.files[0])}
                className="w-full bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded px-4 py-2"
              />
              {errors.thumbnail && <p className="text-red-500 text-sm pl-2 mt-1">{errors.thumbnail}</p>}
            </div>

            {/* Other Images Upload */}
            <div>
              <label className="block mb-2 font-medium">Other Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                ref={imagesRef}
                onChange={(e) => setSelectedImages([...e.target.files])}
                className="w-full bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded px-4 py-2"
              />
              {errors.images && <p className="text-red-500 text-sm pl-2 mt-1">{errors.images}</p>}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 text-center pt-4">
              <button
                type="button"
                className="bg-primary dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg font-medium hover:opacity-90 transition"
                disabled={isLoading}
                onClick={!artwork ? handleAddArtwork : handleUpdateArtwork}
              >
                {isLoading ? "Adding..." : "Submit Artwork"}
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