// pages/Home.js
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Discover from "../components/Discover";
import Explore from "../components/Explore";
import FAQ from "../components/FAQ";

function Home() {
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
      <Discover />
      <Explore />
      <FAQ />
      <Footer />
    </>
  );
}

export default Home;
