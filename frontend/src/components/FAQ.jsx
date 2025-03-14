import React from 'react'
import { useState } from 'react'
function Faq() {
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
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=support@urbanassist.coma" target="_blank" class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap flex-shrink-0 shadow-sm">
                  Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Faq