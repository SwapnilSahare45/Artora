import { useEffect } from "react";
import { Users, Image, ShoppingBag, Gavel } from "lucide-react";
import AdminNav from "../components/AdminNav";
import { useAdminStore } from "../store/adminStore";

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md transition duration-300 hover:shadow-xl">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        {title}
      </h3>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
      {value}
    </p>
  </div>
);

const AdminDashboard = () => {
  const {
    users,
    artworks,
    orders,
    getUsers,
    getArtworks,
    getArtworksInAuction,
    getAllOrders,
  } = useAdminStore();

  useEffect(() => {
    getUsers();
    getArtworks();
    getArtworksInAuction();
    getAllOrders();
  }, [getUsers, getArtworks, getArtworksInAuction, getAllOrders]);

  const artworksInAuction = artworks.filter((a) => a.auctionId).length;
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <AdminNav />

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-24 lg:ml-64 transition-all">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
          Admin Dashboard Overview
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <StatCard
            title="Total Users"
            value={users.length}
            icon={Users}
            color="text-green-500"
          />
          <StatCard
            title="Artworks Listed"
            value={artworks.length}
            icon={Image}
            color="text-yellow-500"
          />
          <StatCard
            title="Artworks in Auction"
            value={artworksInAuction}
            icon={Gavel}
            color="text-blue-500"
          />
          <StatCard
            title="Pending Orders"
            value={pendingOrders}
            icon={ShoppingBag}
            color="text-red-500"
          />
        </div>

        {/* Overview Section */}
        <section className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl shadow-lg min-h-64">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
            Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            ...Additional overview content can go here...
          </p>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
