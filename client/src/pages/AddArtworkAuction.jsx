import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useArtworkStore } from "../store/artworkStore";
import { toast } from "react-toastify";

const AddArtworkAuction = () => {

  const categories = ["Painting", "Sculpture", "Digital", "Photography", "Other"];
  const sizes = ["Small", "Medium", "Large", "Extra Large", "Custom", "Other"];
  const mediums = ["Oil", "Acrylic", "Watercolor", "Digital", "Mixed Media", "Other"];
  const styles = ["Abstract", "Realism", "Impressionism", "Minimalist", "Contemporary", "Other"];
  const orientations = ["Portrait", "Landscape", "Square", "Panoramic", "Other"];

  const { id } = useParams();

  // State to hold artwork data
  const [artworkData, setArtworkData] = useState({ title: '', artist: '', openingBid: '', category: '', size: '', medium: '', style: '', orientation: '', description: '' });

  // To hold reference of thumbnail and images
  const thumbnailRef = useRef(null);
  const imagesRef = useRef(null);

  // State to hold artwork thumbnail & images 
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  // State to hold validation error
  const [errors, setErrors] = useState({ title: '', artist: '', openingBid: '', category: '', size: '', medium: '', style: '', orientation: '', description: '', thumbnail: '', images: '' });


  // Get the states from artwork store
  const { addArtwork, isLoading, error } = useArtworkStore();

  // Function to handle add artwork
  const handleAddArtwork = async () => {
    // Object to store validation error
    const newErrors = { title: '', artist: '', openingBid: '', category: '', size: '', medium: '', style: '', orientation: '', description: '', thumbnail: '', images: '' };

    // Validation
    if (!artworkData.title.trim()) newErrors.title = "Artwork title required.";
    if (!artworkData.artist.trim()) newErrors.artist = "Artwork artist required.";
    if (!artworkData.openingBid.trim()) {
      newErrors.openingBid = "Opening bid required.";
    } else if (artworkData.openingBid < 0) {
      newErrors.openingBid = "Opening bid must be greater than 0.";
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
    data.append('auctionId', id);
    data.append('title', artworkData.title);
    data.append('artist', artworkData.artist);
    data.append('openingBid', artworkData.openingBid);
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
      setArtworkData({ title: '', artist: '', openingBid: '', category: '', size: '', medium: '', style: '', orientation: '', description: '' });

      // Clear file inputs using ref
      if (thumbnailRef.current) thumbnailRef.current.value = '';
      if (imagesRef.current) thumbnailRef.current.value = '';

      // Clear state of thumbnail and images
      setSelectedThumbnail(null);
      setSelectedImages(null);
    }
  }

  // Show error
  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      <Navbar />

      <main
        className="bg-gray-50 dark:bg-gray-900 text-black dark:text-white min-h-screen pt-24 px-6 md:px-16 pb-10"
      >
        {/* Add artwork section */}
        <section
          className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
        >
          <h1
            className="text-3xl font-bold mb-8 text-center"
          >
            Add Artwork for Auction
          </h1>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >

            <div>
              <label className="block mb-2 font-medium">Art Name</label>
              <input
                type="text"
                placeholder="Enter artwork name"
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                value={artworkData.title}
                onChange={(e) => setArtworkData({ ...artworkData, title: e.target.value })}
              />
              {errors.title && <p className="text-red-500 text-sm pl-2 mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block mb-2 font-medium">Artist</label>
              <input type="text"
                placeholder="Enter artist name"
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                value={artworkData.artist}
                onChange={(e) => setArtworkData({ ...artworkData, artist: e.target.value })}
              />
              {errors.artist && <p className="text-red-500 text-sm pl-2 mt-1">{errors.artist}</p>}
            </div>

            <div>
              <label className="block mb-2 font-medium">Opening Bid</label>
              <input
                type="number"
                placeholder="Enter minimum bid"
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                value={artworkData.openingBid}
                onChange={(e) => setArtworkData({ ...artworkData, openingBid: e.target.value })}
              />
              {errors.openingBid && <p className="text-red-500 text-sm pl-2 mt-1">{errors.openingBid}</p>}
            </div>

            <div>
              <label className="block mb-2 font-medium">Category</label>
              <select
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 outline-none"
                value={artworkData.category}
                onChange={(e) => setArtworkData({ ...artworkData, category: e.target.value })}
              >
                <option value="">Select category</option>
                {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
              </select>
              {errors.category && <p className="text-red-500 text-sm pl-2 mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block mb-2 font-medium">Size</label>
              <select
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 outline-none"
                value={artworkData.size}
                onChange={(e) => setArtworkData({ ...artworkData, size: e.target.value })}
              >
                <option value="">Select size</option>
                {sizes.map((item, i) => <option key={i} value={item}>{item}</option>)}
              </select>
              {errors.size && <p className="text-red-500 text-sm pl-2 mt-1">{errors.size}</p>}
            </div>

            <div>
              <label className="block mb-2 font-medium">Medium</label>
              <select
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 outline-none"
                value={artworkData.medium}
                onChange={(e) => setArtworkData({ ...artworkData, medium: e.target.value })}
              >
                <option value="">Select medium</option>
                {mediums.map((item, i) => <option key={i} value={item}>{item}</option>)}
              </select>
              {errors.medium && <p className="text-red-500 text-sm pl-2 mt-1">{errors.medium}</p>}
            </div>

            <div>
              <label className="block mb-2 font-medium">Style</label>
              <select
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 outline-none"
                value={artworkData.style}
                onChange={(e) => setArtworkData({ ...artworkData, style: e.target.value })}
              >
                <option value="">Select style</option>
                {styles.map((item, i) => <option key={i} value={item}>{item}</option>)}
              </select>
              {errors.style && <p className="text-red-500 text-sm pl-2 mt-1">{errors.style}</p>}
            </div>

            <div>
              <label className="block mb-2 font-medium">Orientation</label>
              <select
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 outline-none"
                value={artworkData.orientation}
                onChange={(e) => setArtworkData({ ...artworkData, orientation: e.target.value })}
              >
                <option value="">Select orientation</option>
                {orientations.map((item, i) => <option key={i} value={item}>{item}</option>)}
              </select>
              {errors.orientation && <p className="text-red-500 text-sm pl-2 mt-1">{errors.orientation}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">Description</label>
              <textarea
                rows="4"
                placeholder="Describe your artwork"
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 outline-none"
                value={artworkData.description}
                onChange={(e) => setArtworkData({ ...artworkData, description: e.target.value })}
              >
              </textarea>
              {errors.description && <p className="text-red-500 text-sm pl-2 mt-1">{errors.description}</p>}
            </div>

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

            <div
              className="md:col-span-2 text-center pt-4"
            >
              <button
                className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg font-medium hover:opacity-90 transition"
                disabled={isLoading}
                onClick={handleAddArtwork}
              >
                {isLoading ? 'Adding...' : 'Submit Artwork'}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default AddArtworkAuction;