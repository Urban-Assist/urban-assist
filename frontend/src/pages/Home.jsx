// pages/Home.js
import React from "react";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import MiddleSection from "../components/Testimonial";
import Faq from "../components/faq";

function Home() {



  return (
    <>
      <HeroSection />

      <MiddleSection />
      <Faq />

      <Footer />
    </>
  );
}

export default Home;
