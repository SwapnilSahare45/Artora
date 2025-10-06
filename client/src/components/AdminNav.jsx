import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Users,
  Gavel,
  Image,
  ShoppingBag,
  Palette,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import logo from "../assets/logo.png";
import { useAuthStore } from "../store/authStore";

const AdminNav = () => {
  const { logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const adminLinks = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Create New Auction", path: "/admin/add-auction", icon: PlusCircle },
    { name: "Auctions", path: "/admin/auctions", icon: Gavel },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Artworks", path: "/admin/artworks", icon: Image },
    { name: "Artworks In Auction", path: "/admin/auctions-artwork", icon: Palette },
    { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
  ];

  const handleLogout = () => logout();

  return (
    <>
      {/* Mobile Header with Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between bg-white dark:bg-gray-900 border-b dark:border-gray-800 px-4 py-3 shadow-md">
        <div className="flex items-center">
          <img src={logo} alt="ARTORA" className="w-8" />
          <Link to="/" className="text-primary text-xl font-bold ml-2">
            ARTORA
          </Link>
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6 text-gray-700 dark:text-gray-300" /> : <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />}
        </button>
      </div>

      {/* Sidebar for large screens */}
      <aside className="hidden lg:block w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800 fixed h-screen pt-4 shadow-lg z-20">
        <nav className="p-2 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-start px-3">
            <img src={logo} alt="ARTORA" className="w-8" />
            <Link to="/" className="text-primary text-xl font-bold ml-2">
              ARTORA
            </Link>
          </div>

          <hr className="my-3 border-gray-200 dark:border-gray-800" />

          {/* Links */}
          <div className="flex-grow overflow-y-auto mt-2">
            {adminLinks.map((link) => (
              <NavLink
                key={link.path}
                end={link.path === "/admin"}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center p-3 mb-1 rounded-lg transition-colors duration-200 
                    ${isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`
                }
              >
                <link.icon className="w-5 h-5 mr-3" />
                <span className="text-sm">{link.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Logout */}
          <div className="flex flex-col">
            <hr className="my-3 border-gray-200 dark:border-gray-800" />
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center p-3 rounded-lg transition-colors duration-200 text-red-500 hover:bg-red-50 dark:hover:bg-gray-800"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 border-r dark:border-gray-800 shadow-lg transform transition-transform duration-300 z-40 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <nav className="p-2 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-start px-3 mt-3">
            <img src={logo} alt="ARTORA" className="w-8" />
            <Link
              to="/"
              className="text-primary text-xl font-bold ml-2"
              onClick={() => setIsOpen(false)}
            >
              ARTORA
            </Link>
          </div>

          <hr className="my-3 border-gray-200 dark:border-gray-800" />

          {/* Links */}
          <div className="flex-grow overflow-y-auto mt-2">
            {adminLinks.map((link) => (
              <NavLink
                key={link.path}
                end={link.path === "/admin"}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center p-3 mb-1 rounded-lg transition-colors duration-200 
                    ${isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`
                }
              >
                <link.icon className="w-5 h-5 mr-3" />
                <span className="text-sm">{link.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Logout */}
          <div className="flex flex-col">
            <hr className="my-3 border-gray-200 dark:border-gray-800" />
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full text-left flex items-center p-3 rounded-lg transition-colors duration-200 text-red-500 hover:bg-red-50 dark:hover:bg-gray-800"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default AdminNav;
