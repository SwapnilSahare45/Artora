import { useState, useEffect, useMemo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Bell, Heart, User, LogOut, ShoppingBag, Settings } from "lucide-react";
import logo from "../assets/logo.png";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Theme states
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "system");
  const [themeDropdownDesktop, setThemeDropdownDesktop] = useState(false);
  const [themeDropdownMobile, setThemeDropdownMobile] = useState(false);

  const { user, profile, logout } = useAuthStore();
  // const user = useAuthStore(state => state.user);
  // const profile = useAuthStore(state => state.profile);
  // const logout = useAuthStore(state => state.logout);
  const isAuth = !!user;

  useEffect(() => {
    if (!user) profile();
  }, [user, profile]);

  // Theme effect
  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (t) => {
      if (t === "dark") root.classList.add("dark");
      else root.classList.remove("dark");
      root.dataset.theme = t;
      localStorage.setItem("theme", t);
    };

    const applySystemTheme = () => {
      applyTheme(mq.matches ? "dark" : "light");
    };

    if (theme === "system") {
      applySystemTheme();
      mq.addEventListener("change", applySystemTheme);
      return () => mq.removeEventListener("change", applySystemTheme);
    } else {
      applyTheme(theme);
    };
  }, [theme]);

  const handleLogout = async () => {
    const success = await logout();
    if (success) navigate("/login");
  };

  // --------- NAV LINKS ---------
  const userLinks = useMemo(() => {
    if (!isAuth) {
      return [
        { name: "Home", path: "/" },
      ];
    };

    const authenticatedLinks = [
      { name: "Home", path: "/" },
      { name: "Artworks", path: "/artworks" },
      { name: "Auctions", path: "/auctions" },
    ];

    if (user?.role === "artist" || user?.role === "collector") {
      authenticatedLinks.push({ name: "Sell Artwork", path: "/add-artwork-direct" });
    };

    return authenticatedLinks;

  }, [isAuth, user?.role]);

  const adminLinks = [
    { name: "Dashboard", path: "/admin" },
    { name: "Users", path: "/admin/users" },
    { name: "Artworks", path: "/admin/artworks" },
    { name: "Auctions", path: "/admin/auctions" },
    { name: "Orders", path: "/admin/orders" },
  ];

  const secondaryAuthLinks = [
    { name: "Wishlist", path: "/wishlist", icon: Heart },
    { name: "Notifications", path: "/notifications", icon: Bell },
    { name: "Profile", path: "/profile", icon: User },
    { name: "Orders", path: "/orders", icon: ShoppingBag },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const NavLinkItem = ({ link, isMobile }) => {
    const base = isMobile ? "block py-2 font-medium" : "text-sm font-medium hover:text-primary";
    const active = "text-primary";
    const inactive = "text-gray-700 dark:text-gray-300";
    return (
      <NavLink
        key={link.path}
        to={link.path}
        onClick={isMobile ? () => setIsOpen(false) : undefined}
        className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
      >
        {link.name}
      </NavLink>
    );
  };

  // --------- RENDER NAVBAR BASED ON ROLE ---------
  if (isAuth && user?.role === "admin") {
    // ---------- ADMIN NAVBAR ----------
    return (
      <header className="fixed inset-x-0 top-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-700 border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
          <div className="flex items-center">
            <img src={logo} alt="ARTORA" className="w-8" />
            <Link to="/" className="text-primary font-bold ml-2">ARTORA</Link>
            {isAuth && user?.role === "admin" && <span className="ml-4 text-xs font-semibold text-red-500 border border-red-500 px-2 py-0.5 rounded">ADMIN</span>}
          </div>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {adminLinks.map(link => <NavLinkItem key={link.path} link={link} isMobile={false} />)}
            <button onClick={handleLogout} className="text-red-500 hover:text-red-700">Logout</button>

            {/* Theme */}
            <div className="relative">
              <button
                onClick={() => setThemeDropdownDesktop(!themeDropdownDesktop)}
                className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded text-sm text-gray-700 dark:text-gray-200"
              >
                Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </button>
              {themeDropdownDesktop && (
                <ul className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow text-sm z-50">
                  {["light", "dark", "system"].map(opt => (
                    <li
                      key={opt}
                      className={`cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === opt ? "font-semibold text-primary" : ""}`}
                      onClick={() => { setTheme(opt); setThemeDropdownDesktop(false); }}
                    >
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </nav>

          {/* Mobile toggle */}
          <button className="md:hidden text-gray-700 dark:text-gray-300" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile */}
        {isOpen && (
          <nav className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4">
            {adminLinks.map(link => <NavLinkItem key={link.path} link={link} isMobile={true} />)}
            <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block w-full text-left py-2 text-red-500 font-medium">Logout</button>

            {/* Mobile Theme */}
            <div className="relative mt-2">
              <button onClick={() => setThemeDropdownMobile(!themeDropdownMobile)} className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded text-sm text-gray-700 dark:text-gray-200 w-full text-left">
                Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </button>
              {themeDropdownMobile && (
                <ul className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow text-sm z-50">
                  {["light", "dark", "system"].map(opt => (
                    <li
                      key={opt}
                      className={`cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === opt ? "font-semibold text-primary" : ""}`}
                      onClick={() => { setTheme(opt); setThemeDropdownMobile(false); }}
                    >
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </nav>
        )}
      </header>
    );
  }

  // ---------- USER NAVBAR ----------
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-700 border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        <div className="flex items-center">
          <img src={logo} alt="ARTORA" className="w-8" />
          <Link to="/" className="text-primary font-bold ml-2">ARTORA</Link>
          {isAuth && <span className="ml-4 text-xs font-semibold text-primary border border-primary px-2 py-0.5 rounded">{user?.role?.toUpperCase()}</span>}
        </div>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {userLinks.map(link => <NavLinkItem key={link.path} link={link} isMobile={false} />)}

          {isAuth ? (
            <>
              {/* Wishlist and Notifications (Icons) */}
              <NavLink to="/wishlist" className={({ isActive }) => isActive ? "text-primary" : "text-gray-700 dark:text-gray-300"}><Heart className="w-5 h-5" /></NavLink>
              <NavLink to="/notifications" className={({ isActive }) => isActive ? "text-primary" : "text-gray-700 dark:text-gray-300"}><Bell className="w-5 h-5" /></NavLink>

              {/* Profile Dropdown */}
              <div className="group relative">
                <img src={user?.avatar} alt="profile" className="w-8 h-8 rounded-full cursor-pointer object-cover" />
                <div className="absolute right-0 top-6 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg hidden group-hover:block z-50">

                  {secondaryAuthLinks.filter(link => !["/wishlist", "/notifications"].includes(link.path)).map(link => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                    >
                      <link.icon className="w-4 h-4" />
                      {link.name}
                    </Link>
                  ))}
                  <button onClick={handleLogout} className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-red-500">
                    <LogOut className="w-4 h-4" />Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            // Non-authenticated user links
            <>
              <NavLink to="/login" className="text-sm font-medium text-primary hover:text-primary-dark">Login</NavLink>
              <NavLink to="/register" className="text-sm font-medium text-primary hover:text-primary-dark">Register</NavLink>
            </>
          )}

          {/* Theme */}
          <div className="relative">
            <button onClick={() => setThemeDropdownDesktop(!themeDropdownDesktop)} className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded text-sm text-gray-700 dark:text-gray-200">
              Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </button>
            {themeDropdownDesktop && (
              <ul className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow text-sm z-50">
                {["light", "dark", "system"].map(opt => (
                  <li key={opt} className={`cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === opt ? "font-semibold text-primary" : ""}`} onClick={() => { setTheme(opt); setThemeDropdownDesktop(false); }}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</li>
                ))}
              </ul>
            )}
          </div>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden text-gray-700 dark:text-gray-300" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
      </div>

      {/* Mobile */}
      {isOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4">
          {userLinks.map(link => <NavLinkItem key={link.path} link={link} isMobile={true} />)}

          {isAuth && (
            <>
              {secondaryAuthLinks.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 font-medium text-gray-700 dark:text-gray-300"
                >
                  {link.name}
                </NavLink>
              ))}
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block w-full text-left py-2 font-medium text-red-500 dark:text-red-400">Logout</button>
            </>
          )}

          {/* Mobile Theme */}
          <div className="relative mt-2">
            <button onClick={() => setThemeDropdownMobile(!themeDropdownMobile)} className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded text-sm text-gray-700 dark:text-gray-200 w-full text-left">
              Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </button>
            {themeDropdownMobile && (
              <ul className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow text-sm z-50">
                {["light", "dark", "system"].map(opt => (
                  <li key={opt} className={`cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === opt ? "font-semibold text-primary" : ""}`} onClick={() => { setTheme(opt); setThemeDropdownMobile(false); }}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</li>
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