const FeatureCard = ({ title, description }) => {
  return (
    <div className='bg-white text-black dark:bg-gray-800 dark:text-white text-center py-6 px-4 space-y-2 shadow lg:px-8 md:space-y-4 rounded'>
      <h3 className='text-xl font-semibold lg:text-2xl'>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;