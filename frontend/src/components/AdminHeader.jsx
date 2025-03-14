import { Link } from "react-router-dom";
import { frontendRoutes } from "../utils/frontendRoutes";

const AdminHeader = () => {
  return (
    <header className="h-16 sm:h-20 flex items-center bg-gray-800 font-montserrat shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 sm:px-12 flex items-center justify-between">
        <Link to={frontendRoutes.ADMIN_DASHBOARD} className="no-underline flex items-center">
          <div className="font-black text-white text-2xl flex items-center">
            Urban Assist
            <span className="w-3 h-3 rounded-full bg-purple-600 ml-2"></span>
            <span className="ml-3 px-2 py-1 text-sm bg-blue-600 text-white rounded-md">
              Admin
            </span>
          </div>
        </Link>

        {/* Sign Out Button */}
        <button 
          onClick={() => {/* Add sign out logic */}} 
          className="px-3 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg flex items-center gap-2 ml-4 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>Sign out</span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;