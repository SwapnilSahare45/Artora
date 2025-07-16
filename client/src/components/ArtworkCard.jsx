import { Link } from "react-router-dom";

const ArtworkCard = ({ image, title, artist, price, timeLeft, to = "#" }) => {
  return (
    <Link
      to={to}
      className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white text-black dark:bg-gray-800 dark:text-white"
    >
      <img src={image} alt={title} className="w-full h-60 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">by {artist}</p>
        <div className="mt-2 flex justify-between text-sm font-medium">
          <span className="text-primary">{price}</span>
          <span className="text-gray-600 dark:text-gray-400">{timeLeft}</span>
        </div>
      </div>
    </Link>
  );
};

export default ArtworkCard;
