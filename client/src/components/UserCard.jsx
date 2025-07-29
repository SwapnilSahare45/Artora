import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <div className="bg-white text-black dark:bg-gray-800 dark:text-white rounded-lg p-4 shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-20 h-20 rounded-full object-cover mb-3"
      />
      <Link
        to={`/profile/${user._id}`}
        className="text-lg font-semibold"
      >
        {user.name}
      </Link>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 truncate">{user.bio}</p>
      <button
        className="px-4 py-1 text-sm rounded bg-primary text-white hover:bg-primary/90"
      >
        Connect
      </button>
    </div>
  );
};

export default UserCard;