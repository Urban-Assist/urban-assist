const FAQ = () => {
return(<><div className="mt-28 bg-gray-50 px-4 sm:px-10 py-12">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 items-center gap-8">
        <div className="space-y-6 bg-gray-100 rounded-md p-6 max-w-md max-md:order-1">
          <div className="flex sm:items-center max-sm:flex-col-reverse">
            <div className="mr-3">
              <h4 className="text-base font-semibold">John Doe</h4>
              <p className="mt-2">Veniam proident aute magna anim excepteur et ex consectetur velit ullamco veniam minim
                aute sit.</p>
            </div>
            <img src='https://readymadeui.com/profile_2.webp' className="w-16 h-16 rounded-full max-sm:mb-2" />
          </div>
          <div
            className="flex sm:items-center max-sm:flex-col-reverse p-6 relative lg:left-12 bg-white shadow-[0_2px_20px_-4px_rgba(93,96,127,0.2)] rounded-md">
            <div className="mr-3">
              <h4 className="text-base font-semibold">Mark Adair</h4>
              <p className="mt-2">Veniam proident aute magna anim excepteur et ex consectetur velit ullamco veniam minim
                aute sit.</p>
            </div>
            <img src='https://readymadeui.com/profile_3.webp' className="w-16 h-16 rounded-full max-sm:mb-2" />
          </div>
          <div className="flex sm:items-center max-sm:flex-col-reverse">
            <div className="mr-3">
              <h4 className="text-base font-semibold">Simon Konecki</h4>
              <p className="mt-2">Veniam proident aute magna anim excepteur et ex consectetur velit ullamco veniam minim
                aute sit.</p>
            </div>
            <img src='https://readymadeui.com/profile_4.webp' className="w-16 h-16 rounded-full max-sm:mb-2" />
          </div>
        </div>
        <div>
          <h6 className="text-xl font-bold text-gray-300 mb-4">Testimonials</h6>
          <h2 className="md:text-4xl text-3xl font-bold">We are loyal with our customer</h2>
          <div className="mt-4">
            <p>Veniam proident aute magna anim excepteur et ex consectetur velit ullamco veniam minim aute sit. Elit
              occaecat officia et laboris Lorem minim. Officia do aliqua adipisicing ullamco in.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div className="mt-28 bg-gray-50 px-4 sm:px-10 py-12 space-y-6">
        <div className="md:text-center max-w-2xl mx-auto mb-14">
          <h2 className="md:text-4xl text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <p>Explore common questions and find answers to help you make the most out of our services. If you don't see
            your question here, feel free to contact us for assistance.</p>
        </div>
        <div className="shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] border-2 border-blue-600 rounded-md transition-all"
          role="accordion">
          <button type="button" className="w-full font-semibold text-left py-5 px-6 flex items-center">
            <span className="text-base mr-4">Are there any special discounts or promotions available during the
              event.</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-current ml-auto shrink-0 rotate-180"
              viewBox="0 0 24 24">
              <path fill-rule="evenodd"
                d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                clip-rule="evenodd" data-original="#000000"></path>
            </svg>
          </button>
          <div className="pb-5 px-6">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor arcu,
              at fermentum dui. Maecenas
              vestibulum a turpis in lacinia. Proin aliquam turpis at erat venenatis malesuada. Sed semper, justo vitae
              consequat fermentum, felis diam posuere ante, sed fermentum quam justo in dui. Nulla facilisi. Nulla
              aliquam
              auctor purus, vitae dictum dolor sollicitudin vitae. Sed bibendum purus in efficitur consequat. Fusce et
              tincidunt arcu. Curabitur ac lacus lectus. Morbi congue facilisis sapien, a semper orci facilisis in.
            </p>
          </div>
        </div>
        <div
          className="shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] border-2 border-transparent hover:border-blue-600 rounded-md transition-all"
          role="accordion">
          <button type="button" className="w-full font-semibold text-left py-5 px-6 flex items-center">
            <span className="text-base mr-4">What are the dates and locations for the product launch events?</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-current ml-auto shrink-0 -rotate-90"
              viewBox="0 0 24 24">
              <path fill-rule="evenodd"
                d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                clip-rule="evenodd" data-original="#000000"></path>
            </svg>
          </button>
          <div className="hidden pb-5 px-6">
            <p>Content</p>
          </div>
        </div>
        <div
          className="shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] border-2 border-transparent hover:border-blue-600 rounded-md transition-all"
          role="accordion">
          <button type="button" className="w-full font-semibold text-left py-5 px-6 flex items-center">
            <span className="text-base mr-4">Can I bring a guest with me to the product launch event?</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-current ml-auto shrink-0 -rotate-90"
              viewBox="0 0 24 24">
              <path fill-rule="evenodd"
                d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                clip-rule="evenodd" data-original="#000000"></path>
            </svg>
          </button>
          <div className="hidden pb-5 px-6">
            <p>Content</p>
          </div>
        </div>
        <div
          className="shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] border-2 border-transparent hover:border-blue-600 rounded-md transition-all"
          role="accordion">
          <button type="button" className="w-full font-semibold text-left py-5 px-6 flex items-center">
            <span className="text-base mr-4">How can I contact customer support?</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-current ml-auto shrink-0 -rotate-90"
              viewBox="0 0 24 24">
              <path fill-rule="evenodd"
                d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                clip-rule="evenodd" data-original="#000000"></path>
            </svg>
          </button>
          <div className="hidden pb-5 px-6">
            <p>Content</p>
          </div>
        </div>
        <div
          className="shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] border-2 border-transparent hover:border-blue-600 rounded-md transition-all"
          role="accordion">
          <button type="button" className="w-full font-semibold text-left py-5 px-6 flex items-center">
            <span className="text-base mr-4">What payment methods do you accept?</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-current ml-auto shrink-0 -rotate-90"
              viewBox="0 0 24 24">
              <path fill-rule="evenodd"
                d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                clip-rule="evenodd" data-original="#000000"></path>
            </svg>
          </button>
          <div className="hidden pb-5 px-6">
            <p>Content</p>
          </div>
        </div>
        </div>
      
      
          
          
  </>
  );
}
export default FAQ;