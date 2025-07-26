const TestimonialCard = ({ name, role, image, quote }) => {
  return (
    <div
      className="bg-white text-black dark:bg-gray-800 dark:text-white rounded-lg shadow p-6 flex flex-col items-center text-center"
    >
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-full mb-4 object-cover"
      />
      <p>
        &quot;{quote}&quot;
      </p>
      <h6
        className='text-lg font-semibold py-2 text-primary'
      >
        {name}
      </h6>
      <p
        className='text-muted-foreground'
      >
        {role}
      </p>
    </div>
  );
};

export default TestimonialCard;