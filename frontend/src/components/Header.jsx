import { useState } from "react";
import { Link } from "react-router-dom";
import { frontendRoutes } from "../utils/frontendRoutes";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle

  const getNavLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `${
      isActive
        ? "border-blue-500 text-gray-900 font-semibold "
        : "border-transparent text-gray-900 hover:text-gray-900 hover:border-blue-500 hover:font-bold "
    } inline-flex items-center px-3 pt-1 border-b-2 text-lg font-medium transition-colors duration-200 `;
  };

  return (
    <header className="h-16 sm:h-20 flex items-center bg-[rgb(252,250,250)] font-montserrat shadow-md fixed top-0 left-0 w-full z-50 ">
      <div className="container mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to={frontendRoutes.HOME} className="no-underline">
          <div className="font-black text-blue-900 text-2xl flex items-center">
            Urban Assist
            <span className="w-3 h-3 rounded-full bg-purple-600 ml-2"></span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-10">
          <Link
            to={frontendRoutes.DASHBOARD}
            className={getNavLinkClass(frontendRoutes.DASHBOARD)}
          >
            Book a Service
          </Link>
          <Link
            to={frontendRoutes.HOME}
            className={getNavLinkClass(frontendRoutes.EXAMPLE)}
          >
            My bookings
          </Link>
          <Link
            to={frontendRoutes.HOME}
            className={getNavLinkClass(frontendRoutes.EXAMPLE)}
          >
            Favorites
          </Link>
          <Link
            to={frontendRoutes.HOME}
            className={getNavLinkClass(frontendRoutes.EXAMPLE)}
          >
            Contact us
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex flex-col ml-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-1 rounded-full bg-purple-800 mb-1"></span>
          <span className="w-6 h-1 rounded-full bg-purple-800 mb-1"></span>
          <span className="w-6 h-1 rounded-full bg-purple-800 mb-1"></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden w-full bg-white shadow-md absolute top-16 left-0 py-4">
          <nav className="flex flex-col items-center space-y-4">
            <Link
              to={frontendRoutes.DASHBOARD}
              className={getNavLinkClass(frontendRoutes.DASHBOARD)}
            >
              Book a Service
            </Link>
            <Link
              to={frontendRoutes.HOME}
              className={getNavLinkClass(frontendRoutes.HOME)}
            >
              My bookings
            </Link>
            <Link
              to={frontendRoutes.HOME}
              className={getNavLinkClass(frontendRoutes.HOME)}
            >
              Favorites
            </Link>
            <Link
              to={frontendRoutes.HOME}
              className={getNavLinkClass(frontendRoutes.HOME)}
            >
              Contact us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
