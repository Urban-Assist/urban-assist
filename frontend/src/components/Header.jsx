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

          {/* Login Button */}
          <Link to={frontendRoutes.LOGIN}>
            <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
              {/* Heroicons - Login Solid */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Login</span>
            </button>
          </Link>
        </nav>

        <button
          className="lg:hidden flex flex-col ml-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-1 rounded-full bg-purple-800 mb-1"></span>
          <span className="w-6 h-1 rounded-full bg-purple-800 mb-1"></span>
          <span className="w-6 h-1 rounded-full bg-purple-800 mb-1"></span>
        </button>
      </div>

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

            {/* Mobile Login Button */}
            <Link to={frontendRoutes.LOGIN}>
              <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Login</span>
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
