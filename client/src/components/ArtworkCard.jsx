import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFormattedTimeLeft } from "../../utils/getFormattedTimeLeft";

const ArtworkCard = ({ image, title, artist, amount, timeLeft, to = "#" }) => {
  // State to set time
  const [time, setTime] = useState("");

  // When component mount set the formatted time left
  useEffect(() => {
    if (!timeLeft) return;

    const interval = setInterval(() => {
      const res = getFormattedTimeLeft(timeLeft);
      setTime(res);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft])

  return (
    <Link
      to={to}
      className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white text-black dark:bg-gray-800 dark:text-white relative self-start"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">by {artist}</p>
        <div className="mt-2 flex justify-between text-sm font-medium">
          <span className="text-primary">₹ {amount}</span>
          <span className="text-gray-600 dark:text-gray-400">{time}</span>
        </div>
      </div>
    </Link>
  );
};

export default ArtworkCard;