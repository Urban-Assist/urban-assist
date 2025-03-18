import { frontendRoutes } from "../utils/frontendRoutes"
import { Link } from 'react-router-dom';
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-200" role="contentinfo">
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 mb-4">

          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-indigo-600 rounded-lg w-10 h-10 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">Urban Assist</span>
            </div>
            <p className="text-gray-600 mb-6">
              Connecting verified service providers with users who need their expertise, all in one seamless platform.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4" role="navigation" aria-label="Social media links">
              <a href="#" className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow" aria-label="Facebook">
                <svg className="h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow" aria-label="Twitter">
                <svg className="h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div role="navigation" aria-label="Quick links">
            <h3 className="text-gray-900 font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to={frontendRoutes.DASHBOARD} className="text-gray-600 hover:text-indigo-600 transition-colors">Home</Link></li>
              <li><Link to={frontendRoutes.BOOKING} className="text-gray-600 hover:text-indigo-600 transition-colors">Bookings</Link></li>
              <li><Link to={frontendRoutes.REPORT} className="text-gray-600 hover:text-indigo-600 transition-colors">Report</Link></li>
              <li>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=support@urbanassist.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Bar */}
          <div className=" py-6">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-600">(555) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className=" py-6">
            <p className="text-gray-400 text-sm text-center">© {new Date().getFullYear()} Urban Assist. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>

  )
}
