import React from "react";

function HeroSection() {
  return (
    <>
      <section 
        className="min-h-[80vh] w-full bg-gradient-to-br from-cyan-50 via-pink-100 to-yellow-100 flex items-center justify-center px-4 mt-10"
        aria-labelledby="hero-section-title"
      >
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span
            className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-full"
            aria-label="Urban Assist"
          >
            Urban Assist
          </span>

          <h1 
            id="hero-section-title"
            className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight"
          >
            <span className="font-serif italic">Quility</span> home service
            <br className="hidden sm:block" /> on demand
          </h1>

          <p 
            id="hero-description"
            className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            aria-describedby="hero-description"
          >
            Experienced, hand-picked Professionals to serve you at your doorstep
          </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto" aria-labelledby="why-choose-title">
        <div className="text-center mb-12">
          <h2 id="why-choose-title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Urban Assist
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto" aria-describedby="why-choose-description">
            We're committed to connecting you with verified service providers you can trust
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
          {/* Trust Feature 1 */}
          <div 
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center" 
            role="listitem" 
            aria-labelledby="feature-1-title"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 
              id="feature-1-title"
              className="text-xl font-semibold text-gray-900 mb-2"
            >
              Verified Providers
            </h3>
            <p className="text-gray-600">
              All service providers undergo a thorough verification process
              before being listed.
            </p>
          </div>

          {/* Trust Feature 2 */}
          <div 
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center" 
            role="listitem" 
            aria-labelledby="feature-2-title"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 
              id="feature-2-title"
              className="text-xl font-semibold text-gray-900 mb-2"
            >
              Flexible Scheduling
            </h3>
            <p className="text-gray-600">
              Book services at your convenience with our easy scheduling system.
            </p>
          </div>

          {/* Trust Feature 3 */}
          <div 
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center" 
            role="listitem" 
            aria-labelledby="feature-3-title"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 
              id="feature-3-title"
              className="text-xl font-semibold text-gray-900 mb-2"
            >
              Secure Payments
            </h3>
            <p className="text-gray-600">
              All transactions are secure and only processed after service
              approval.
            </p>
          </div>

          {/* Trust Feature 4 */}
          <div 
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center" 
            role="listitem" 
            aria-labelledby="feature-4-title"
          >
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <h3 
              id="feature-4-title"
              className="text-xl font-semibold text-gray-900 mb-2"
            >
              Ratings & Reviews
            </h3>
            <p className="text-gray-600">
              Transparent feedback system to help you choose the best service
              providers.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
