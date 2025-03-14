// pages/Home.js
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Discover from "../components/Discover";
import Explore from "../components/Explore";
import FAQ from "../components/FAQ";
import avatar1 from '../assets/avatar.jpg';
import { useState } from "react";
function Home() {
  const testimonials = [
    {
      name: "Michael Chen",
      service: "Home Cleaning Service",
      rating: 5,
      text: "The verification process gave me confidence in hiring a cleaner through Urban Assist. The service was excellent and exactly as described.",
      avatar: "frontend/src/assets/avatar1.jpg",
    },
    {
      name: "Emily Rodriguez",
      service: "Web Development",
      rating: 5,
      text: "As a freelance developer, Urban Assist has connected me with quality clients. The platform handles all the administrative work so I can focus on coding.",
      avatar: "/api/placeholder/48/48",
    },
    {
      name: "David Thompson",
      service: "Financial Consulting",
      rating: 4,
      text: "Found an excellent financial advisor through Urban Assist. The platform made it easy to compare options and verify credentials before making a decision.",
      avatar: "/api/placeholder/48/48",
    },
  ];

  const [openQuestions, setOpenQuestions] = useState({
    "find-services": true,
  });

  const toggleQuestion = (id) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const faqs = [
    {
      id: "find-services",
      question: "How do I find services on Urban Assist?",
      answer:
        "You can search for services by category, location, or specific keywords. Our advanced filters allow you to narrow down options based on price range, availability, ratings, and more. Each service listing includes detailed information, photos, and reviews to help you make an informed decision.",
    },
    {
      id: "booking-process",
      question: "What is the booking process like?",
      answer:
        "Select a service you're interested in, choose your preferred date and time, and submit a request. The service provider will review your request and either approve it or suggest alternatives. Once approved, you'll proceed to payment. After the service is completed, you can leave a review and rating.",
    },
    {
      id: "service-guarantee",
      question: "Does Urban Assist guarantee the quality of services?",
      answer:
        "While we can't guarantee every aspect of service delivery, we take several measures to ensure quality: thorough verification of all providers, a review and rating system, and our satisfaction guarantee. If a service doesn't meet reasonable expectations, our customer support team will work with you to resolve the issue.",
    },
    {
      id: "cancel-booking",
      question: "How do I cancel a booking?",
      answer:
        "You can cancel a booking through your user dashboard. Our cancellation policy varies depending on how close to the scheduled service time you cancel. Cancellations made more than 24 hours in advance typically receive a full refund, while later cancellations may incur a fee. Emergency situations are handled on a case-by-case basis.",
    }
  ];
  return (
    <>
      <section className="min-h-[80vh] w-full bg-gradient-to-br bg-gradient-to-br from-cyan-50 via-pink-100 to-yellow-100 flex items-center justify-center px-4 mt-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
            Urban Assist
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight">
            <span className="font-serif italic">Quility</span> home service
            <br className="hidden sm:block" /> on demand
          </h1>

          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Experienced, hand-picked Professionals to serve you at your doorstep


          </p>

          <div className="pt-4 flex justify-center relative">
            <div className="relative w-64">
              <select
                className="w-full appearance-none rounded-full bg-white px-4 py-3 text-gray-700 shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                defaultValue=""
              >
                <option value="" disabled>
                  Select your city
                </option>
                <option value="new-york">New York</option>
                <option value="los-angeles">Los Angeles</option>
                <option value="chicago">Chicago</option>
                <option value="houston">Houston</option>
                <option value="phoenix">Phoenix</option>
              </select>


            </div>
          </div>

        </div>
      </section>

      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Urban Assist</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're committed to connecting you with verified service providers you can trust
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Trust Feature 1 */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Providers</h3>
            <p className="text-gray-600">
              All service providers undergo a thorough verification process before being listed.
            </p>
          </div>

          {/* Trust Feature 2 */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
            <p className="text-gray-600">Book services at your convenience with our easy scheduling system.</p>
          </div>

          {/* Trust Feature 3 */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payments</h3>
            <p className="text-gray-600">All transactions are secure and only processed after service approval.</p>
          </div>

          {/* Trust Feature 4 */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ratings & Reviews</h3>
            <p className="text-gray-600">Transparent feedback system to help you choose the best service providers.</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover why thousands of users and service providers trust Urban Assist
            </p>
          </div>

          {/* Featured Testimonial */}
          <div className="relative mb-20">
            {/* Background Elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-indigo-100 rounded-full opacity-50 hidden md:block"></div>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-indigo-100 rounded-full opacity-50 hidden md:block"></div>
            <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-blue-100 rounded-full opacity-50 hidden md:block"></div>

            {/* Quote Mark */}
            <div className="absolute -top-8 left-10 md:left-20 text-indigo-200 text-[120px] leading-none font-serif">
              "
            </div>

            <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12 overflow-hidden">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/3 flex flex-col items-center md:items-start">
                  <div className="relative">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={avatar1}
                        alt="Sarah Johnson"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-xl font-bold text-gray-900">Sarah Johnson</h3>
                    <p className="text-indigo-600 font-medium">Marketing Director</p>
                    <div className="flex items-center justify-center md:justify-start mt-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-2/3">
                  <blockquote className="text-gray-700 text-lg md:text-xl italic leading-relaxed">
                    Urban Assist transformed how our company finds reliable service providers. The verification process
                    gives us confidence, and the platform's intuitive design makes it easy to find exactly what we need.
                    We've saved countless hours that were previously spent vetting providers ourselves.
                  </blockquote>
                  <div className="mt-6 flex items-center">
                    <div className="h-0.5 w-12 bg-indigo-500 mr-4"></div>
                    <p className="text-gray-500">Used Urban Assist for 2+ years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Quote Icon */}
                <div className="mb-4 text-indigo-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>

                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 mb-6">"{testimonial.text}"</blockquote>

                {/* User Info */}
                <div className="flex items-center">
                  {/* <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={avatar1}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div> */}
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="mt-16 text-center">
          <div className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer group">
            <span className="font-medium">View all testimonials</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div> */}
        </div>
      </section>
      <section className="py-20 px-4 md:px-8 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-0 w-64 h-64 bg-indigo-50 rounded-full opacity-70 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-blue-50 rounded-full opacity-70 translate-x-1/2 translate-y-1/2 blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about using Urban Assist
            </p>
          </div>

          {/* Featured Question */}
          <div className="mb-12 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 rounded-full p-3 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How does Urban Assist work?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Urban Assist connects you with verified service providers in your area. Browse services, read reviews,
                  and book appointments with confidence knowing all providers have been thoroughly vetted. After service
                  completion, you can pay securely through our platform and leave feedback to help other users.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ List - Single Column Layout */}
          <div className="space-y-6">
            {faqs.map((faq, index) => {
              // Alternate styles for visual interest
              const isHighlighted = index % 3 === 0
              const isRounded = index % 2 === 0

              return (
                <div
                  key={faq.id}
                  className={`
                  overflow-hidden transition-all duration-300 hover:shadow-md
                  ${isHighlighted ? "bg-indigo-50" : "bg-white border border-gray-200"} 
                  ${isRounded ? "rounded-xl" : "rounded-lg"}
                `}
                >
                  <button
                    onClick={() => toggleQuestion(faq.id)}
                    className="flex justify-between items-start w-full text-left p-6 focus:outline-none"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`
                      flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mt-0.5
                      ${openQuestions[faq.id]
                            ? "bg-indigo-600 text-white"
                            : isHighlighted
                              ? "bg-white text-indigo-600"
                              : "bg-indigo-100 text-indigo-600"
                          }
                    `}
                      >
                        <span className="text-sm font-medium">{index + 1}</span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 pr-8">{faq.question}</h3>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${openQuestions[faq.id] ? "transform rotate-180 text-indigo-600" : "text-gray-400"
                        }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${openQuestions[faq.id] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed pl-16">{faq.answer}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Still Have Questions */}
          <div className="mt-16 bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="hidden md:block bg-indigo-100 rounded-full p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Still have questions?</h3>
                  <p className="text-gray-600">
                    Can't find the answer you're looking for? Our friendly team is here to help.
                  </p>
                </div>
              </div>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=help@urbanassist.ca" target="_blank" class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap flex-shrink-0 shadow-sm">
                  Contact Support
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* <Discover />
      <Explore />
      <FAQ />
      <Footer /> */}
      <Footer />
    </>
  );
}

export default Home;
