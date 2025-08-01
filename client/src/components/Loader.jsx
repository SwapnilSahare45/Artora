const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 bg-opacity-80 flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-gray-400 dark:border-gray-600"></div>
    </div>
  );
};

export default Loader;
