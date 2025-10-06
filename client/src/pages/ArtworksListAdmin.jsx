import { Trash2, Search } from 'lucide-react';
import AdminNav from '../components/AdminNav';
import { useAdminStore } from '../store/adminStore';
import { useState, useEffect } from 'react';

const StatusPill = ({ sold }) => {
  const text = sold ? "Sold" : "Listed";
  const baseClasses = "inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium";

  const colorClasses = sold
    ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
    : "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";

  return <span className={`${baseClasses} ${colorClasses}`}>{text}</span>;
};

const ArtworksListAdmin = () => {
  const { getArtworks, deleteArtwork, artworks } = useAdminStore();
  const [inputSearch, setInputSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      getArtworks(inputSearch);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputSearch, getArtworks]);

  const handleDelete = (artworkId) => {
    if (window.confirm("Are you sure you want to delete this artwork? This action cannot be undone.")) {
      deleteArtwork(artworkId);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <AdminNav />

      <main className="flex-1 p-4 sm:p-8 pt-24 ml-0 sm:ml-64">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
          Artwork Management ({artworks.length} Items)
        </h1>

        <div className="space-y-6">
          {/* Search Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg border dark:border-gray-700">
            <div className="relative w-full sm:w-1/3">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search artworks by title or artist..."
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          {/* Desktop Table */}
          <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 hidden sm:table">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Artwork</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Status</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {artworks.length > 0 ? (
                  artworks.map((artwork) => (
                    <tr key={artwork._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img className="h-10 w-10 rounded object-cover" src={artwork.thumbnail} alt={`${artwork.title} thumbnail`} />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{artwork.title}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">By: {artwork.artist}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{artwork.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600 dark:text-green-400">₹ {artwork.price ? artwork.price.toFixed(2) : 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap"><StatusPill sold={artwork.sold} /></td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          onClick={() => handleDelete(artwork._id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 transition-colors duration-150 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                          title="Delete Artwork"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                      {inputSearch ? `No artworks found matching "${inputSearch}".` : 'No artworks available.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Mobile List */}
            <div className="sm:hidden divide-y divide-gray-200 dark:divide-gray-700">
              {artworks.length > 0 ? (
                artworks.map((artwork) => (
                  <div
                    key={artwork._id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={artwork.thumbnail}
                        alt={`${artwork.title} thumbnail`}
                        className="h-12 w-12 rounded object-cover"
                      />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">{artwork.title}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">By: {artwork.artist}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{artwork.category} • ₹ {artwork.price ? artwork.price.toFixed(2) : 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <StatusPill sold={artwork.sold} />
                      <button
                        onClick={() => handleDelete(artwork._id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 transition-colors duration-150 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                        title="Delete Artwork"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-6 text-gray-500 dark:text-gray-400">
                  {inputSearch ? `No artworks found matching "${inputSearch}".` : 'No artworks available.'}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArtworksListAdmin;
