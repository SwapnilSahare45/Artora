import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Logo & description */}
        <div>
          <Link to="/" className="flex items-center mb-4">
            <img src={logo} alt="ARTORA" className="w-12" />
            <h1 className="text-2xl text-primary inline-block">ARTORA</h1>
          </Link>
          <p className="text-sm mt-2">
            Discover, buy, and sell incredible artwork from talented artists around the world.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-base font-semibold mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/artworks" className="hover:text-primary">Artworks</Link></li>
            <li><Link to="/auctions" className="hover:text-primary">Auctions</Link></li>
            <li><Link to="/connect" className="hover:text-primary">Connect</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-base font-semibold mb-3">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1" />
              123 Art Street, Creativity City, Artland
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +1 (234) 567-890
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              support@artora.com
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-base font-semibold mb-3">Follow Us</h3>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-primary" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-primary" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-gray-200 dark:border-gray-700 mt-6">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Artora. All rights reserved.
        </div>
      </div>
    </footer >
  );
};

export default Footer;
