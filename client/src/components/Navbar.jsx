import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Bell,
  Heart,
  MessageCircle,
  User,
  LogOut,
  ShoppingBag,
  Settings,
} from "lucide-react";
import logo from "../assets/logo.png"; // Adjust the path as necessary

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "system");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsOpen(false); // close mobile menu on route change
  }, [location]);

  useEffect(() => {
 let root = window.document.documentElement;
  if (theme === "dark") {
   root.classList.add("dark");
 } else if (theme === "light") {
    root.classList.remove("dark");
 } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
   prefersDark ? root.classList.add("dark") : root.classList.remove("dark");
  }

  localStorage.setItem("theme", theme);
   root = document.documentElement;

  if (theme === "system") {
   // reflect the system preference each time the media query fires
    const apply = () =>
   (root.dataset.theme =
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");

    apply();                           // initial run
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
   mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply); // cleanup
  }

  root.dataset.theme = theme;          // "light" or "dark"
  localStorage.setItem("theme", theme);
 }, [theme]);


  /* ─── Auth placeholder ──────────────────────── */
  const isAuth = true;
  const userAvatar = "https://i.pravatar.cc/32?img=25";

  const baseLinks = [
    { name: "Home", path: "/" },
    { name: "Artworks", path: "/artworks" },
    { name: "Auctions", path: "/auctions" },
    { name: "Connect", path: "/connect" },
    {name:"Sell Artwork", path:"/add-artwork-direct"},
  ];
  const guestLinks = [
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  /* ─── JSX ───────────────────────────────────── */
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-700 border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        <div className="flex items-center">
          <img src={logo} alt="ARTORA" className="w-8"/>
          <Link to="/" className="text-primary">
          ARTORA
        </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {baseLinks.map((l) => (
            <NavLink
              key={l.name}
              to={l.path}
              className={({ isActive }) =>
                `text-sm font-medium hover:text-primary ${isActive
                  ? "text-primary"
                  : "text-gray-700 dark:text-gray-300"
                }`
              }
            >
              {l.name}
            </NavLink>
          ))}

          {!isAuth &&
            guestLinks.map((l) => (
              <NavLink
                key={l.name}
                to={l.path}
                className={({ isActive }) =>
                  `text-sm font-medium hover:text-primary ${isActive
                    ? "text-primary"
                    : "text-gray-700 dark:text-gray-300"
                  }`
                }
              >
                {l.name}
              </NavLink>
            ))}

          {isAuth && (
            <>
              <NavLink
                to="/wishlist"
                className={({ isActive }) =>
                  `hover:text-primary ${isActive
                    ? "text-primary"
                    : "text-gray-700 dark:text-gray-300"
                  }`
                }
              >
                <Heart className="w-5 h-5" />
              </NavLink>
              <NavLink
                to="/messages"
                className={({ isActive }) =>
                  `hover:text-primary ${isActive
                    ? "text-primary"
                    : "text-gray-700 dark:text-gray-300"
                  }`
                }
              >
                <MessageCircle className="w-5 h-5" />
              </NavLink>
              <NavLink
                to="/notifications"
                className={({ isActive }) =>
                  `hover:text-primary ${isActive
                    ? "text-primary"
                    : "text-gray-700 dark:text-gray-300"
                  }`
                }
              >
                <Bell className="w-5 h-5" />
              </NavLink>

              {/* Profile dropdown */}
              <div className="group relative bg-gray-50 text-black dark:bg-gray-900 dark:text-white">
                <img
                  src={userAvatar}
                  alt="profile"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                <div className="absolute -right-10 w-40 bg-white dark:bg-gray-800 rounded shadow-lg hidden group-hover:block">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ShoppingBag className="w-4 h-4" /> Orders
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                  <button
                    onClick={() => {/* logout */ }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Theme Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded text-sm text-gray-700 dark:text-gray-200"
            >
              Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </button>
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:text-white rounded shadow text-sm z-50">
                {["light", "dark", "system"].map((option) => (
                  <li
                    key={option}
                    className={`cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === option ? "font-semibold text-primary" : ""
                      }`}
                    onClick={() => {
                      setTheme(option);
                      setDropdownOpen(false);
                    }}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-300"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4">
          {[...baseLinks, ...(isAuth ? [] : guestLinks)].map((l) => (
            <NavLink
              key={l.name}
              to={l.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-2 font-medium ${isActive
                  ? "text-primary"
                  : "text-gray-700 dark:text-gray-300"
                }`
              }
            >
              {l.name}
            </NavLink>
          ))}

          {isAuth && (
            <>
              {["/wishlist", "/messages", "/notifications", "/profile", "/orders", "/settings"].map(
                (p) => (
                  <NavLink
                    key={p}
                    to={p}
                    onClick={() => setOpen(false)}
                    className="block py-2 font-medium text-gray-700 dark:text-gray-300"
                  >
                    {p.replace("/", "").charAt(0).toUpperCase() + p.slice(2)}
                  </NavLink>
                )
              )}
              <button
                onClick={() => {
                  setOpen(false);
                  /* logout */
                }}
                className="block w-full text-left py-2 font-medium text-gray-700 dark:text-gray-300"
              >
                Logout
              </button>
            </>
          )}

          {/* mobile theme selector */}
          <div className="relative mt-2">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded text-sm text-gray-700 dark:text-gray-200 w-full text-left"
            >
              Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </button>
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow text-sm z-50">
                {["light", "dark", "system"].map((option) => (
                  <li
                    key={option}
                    className={`cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      theme === option ? "font-semibold text-primary" : ""
                    }`}
                    onClick={() => {
                      setTheme(option);
                      setDropdownOpen(false);
                    }}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
