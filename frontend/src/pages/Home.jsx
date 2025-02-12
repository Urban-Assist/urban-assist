// pages/Home.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Discover from '../components/Discover';
import Explore from '../components/Explore';
import FAQ from '../components/FAQ';

function Home() {
  return <>
    <Header />
    <div >
      <div className='relative'>
      <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="hero" />
      <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      <h2 className='text-4xl font-bold absolute text-white top-70 left-95 tracking-wide'>URBAN ASSIST</h2>
    </div>
    <Discover />
    <Explore />
    <FAQ />
    <Footer />
  </>
}

export default Home;
