import { useState } from 'react';
import AdminNav from '../components/AdminNav';
import { Calendar, Clock, Loader2, Save } from 'lucide-react';
import { useAuctionStore } from '../store/auctionStore';

const CreateAuctionAdmin = () => {

  const { createAuction, isLoading, error: APIError } = useAuctionStore();

  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    startTime: '09:00',
    endDate: '',
    endTime: '21:00',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);


    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}:00`);
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}:00`);

    if (startDateTime >= endDateTime) {
      setError('End date and time must be strictly after the start date and time.');
      return;
    }
    const today = new Date();
    if (startDateTime <= today) {
      setError('Start date and time must be in the future.');
      return;
    }

    const auctionData = {
      title: formData.title,
      startDate: startDateTime.toISOString(),
      endDate: endDateTime.toISOString(),
    };

    try {
      const result = await createAuction(auctionData);
      if (result.success) {
        setSuccessMessage(`Auction "${formData.title}" created successfully!`);

        // Reset form state
        setFormData({
          title: '',
          startDate: '',
          startTime: '09:00',
          endDate: '',
          endTime: '21:00',
        });
      } else {
        const apiError = APIError || 'Failed to create auction. Check server logs.';
        setError(apiError);
      }

    } catch (err) {
      setError('An unexpected local error occurred.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <AdminNav />

      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-24 ml-0 md:ml-64">

        <section className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg">
          <h1 className="text-xl md:text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Create New Auction Event 📅
          </h1>

          {/* Success/Error Alerts */}
          {successMessage && (
            <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-700 dark:text-green-400">
              {successMessage}
            </div>
          )}
          {error && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400">
              Error: {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="md:col-span-2">
              <label htmlFor="title" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Auction Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Modern Art Festival Auction"
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Date & Time Group: Start */}
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 pt-4 border-t dark:border-gray-700">Start Time</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Start Date */}
              <div>
                <label htmlFor="startDate" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                  Date
                </label>
                <div className='relative'>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                  />
                  <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="startTime" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                  Time
                </label>
                <div className='relative'>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                  />
                  <Clock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Date & Time Group: End */}
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 pt-4 border-t dark:border-gray-700">End Time</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* End Date */}
              <div>
                <label htmlFor="endDate" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                  Date
                </label>
                <div className='relative'>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    min={formData.startDate || new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                  />
                  <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* End Time */}
              <div>
                <label htmlFor="endTime" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                  Time
                </label>
                <div className='relative'>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                  />
                  <Clock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="md:col-span-2 text-center pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto flex justify-center items-center gap-2 px-6 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 dark:disabled:bg-blue-800 transition-colors"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {isLoading ? 'Creating Auction...' : 'Create Auction'}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default CreateAuctionAdmin;