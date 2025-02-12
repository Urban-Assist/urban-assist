import { useState } from "react";

const Footer = () => {

    return(<footer class="bg-gray-100 p-10 pb-6 w-full">
        <div class="max-w-screen-xl mx-auto">
          <div class="grid lg:grid-cols-5 sm:grid-cols-2 gap-8">
            <div class="lg:col-span-2 space-y-3">
              <h3 class="text-base text-blue-500 font-bold mb-5">ReadymadeUI</h3>
              <p class="text-base text-gray-600">1234 Elm St. Anytown, USA 12345</p>
              <p class="text-base text-gray-600">abc@abc.com</p>
              <p class="text-base text-gray-600">+1 123-456-7890</p>
            </div>
            <div>
              <h3 class="text-base text-blue-500 font-bold mb-5">Products</h3>
              <ul class="space-y-3">
                <li><a href="#" class="text-base text-gray-600 hover:text-blue-500">Website Templates</a></li>
                <li><a href="#" class="text-base text-gray-600 hover:text-blue-500">Dashboard Designs</a></li>
                <li><a href="#" class="text-base text-gray-600 hover:text-blue-500">E-commerce Layouts</a></li>
                <li><a href="#" class="text-base text-gray-600 hover:text-blue-500">UI Components</a></li>
                <li><a href="#" class="text-base text-gray-600 hover:text-blue-500">Landing Pages</a></li>
                <li><a href="#" class="text-base text-gray-600 hover:text-blue-500">Marketing Templates</a></li>
              </ul>
            </div>
            <div>
              <h3 class="text-base text-blue-500 font-bold mb-5">About</h3>
              <ul class="space-y-3">
                <li><a href="#" class="text-base text-gray-600 hover:text-blue-500">Our Story</a></li>
                <li><a href="#" class="text-base text-gray-600 hover:text-blue-500">Careers</a></li>
                <li><a href="#" class="text-base text-gray-600 hover:text-blue-500">Press</a></li>
                <li><a href="#" class="text-base text-gray-600 hover:text-blue-500">Testimonials</a></li>
                <li><a href="#" class="text-base text-gray-600 hover:text-blue-500">FAQs</a></li>
                <li><a href="#" class="text-base text-gray-600 hover:text-blue-500">Contact Support</a></li>
              </ul>
            </div>
            <div>
              <h3 class="text-base text-blue-500 font-bold mb-5">Follow Us</h3>
              <ul class="space-y-3">
                <li><a href="#" class="text-base text-gray-600 hover:text-blue-500">LinkedIn</a></li>
                <li><a href="#" class="text-base text-gray-600 hover:text-blue-500">YouTube</a></li>
                <li><a href="#" class="text-base text-gray-600 hover:text-blue-500">Pinterest</a></li>
                <li><a href="#" class="text-base text-gray-600 hover:text-blue-500">TikTok</a></li>
                <li><a href="#" class="text-base text-gray-600 hover:text-blue-500">Reddit</a></li>
                <li><a href="#" class="text-base text-gray-600 hover:text-blue-500">GitHub</a></li>
              </ul>
            </div>
          </div>
          <hr class="mt-12 mb-6" />
          <div class="text-base text-center text-gray-600">
            Copyright © 2025 Urban Assist
          </div>
        </div>
      </footer>);
}

export default Footer;