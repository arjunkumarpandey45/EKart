import React from "react";
import {
  FaHeadset,
  FaShippingFast,
  FaShieldAlt,
  FaUndo,
  FaArrowRight,
} from "react-icons/fa";
import hero from "../assets/hero.jpg";
import { Link } from "react-router";

function OverView() {
  return (
    <section className="mt-16 w-full bg-[#fdfdfd] overflow-hidden">
      {/* --- Modern Hero Section --- */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Text Content - Left Side */}
          <div className="flex-1 space-y-6 text-center lg:text-left order-2 lg:order-1">
            <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest rounded-full">
              New Collection 2026 ⚡
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1]">
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
                Daily Style
              </span>
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto lg:mx-0">
              Discover the latest trends in tech and fashion. Handpicked premium 
              products delivered right to your doorstep with "HotDrop" speed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link  to={'/products'} className="group px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-gray-200">
                Shop Now <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
              </Link >
             
            </div>
          </div>

          <div className="flex-1 relative order-1 lg:order-2">
            <div className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src={hero}
                alt="Shopping Experience"
                className="w-full h-auto object-cover scale-110 hover:scale-100 transition-transform duration-700"
              />
            </div>
           
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-indigo-100 rounded-[2.5rem] -z-10 rotate-[-4deg]"></div>
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-100 rounded-full blur-3xl opacity-60 -z-10"></div>
          </div>
        </div>
      </div>

 
      <div className="mx-auto max-w-6xl px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 grid grid-cols-2 lg:grid-cols-4 p-8 gap-8 lg:gap-4">
          
          <FeatureItem 
            icon={<FaShippingFast />} 
            title="Fast Delivery" 
            desc="Across 200+ cities" 
          />
          <FeatureItem 
            icon={<FaHeadset />} 
            title="Expert Support" 
            desc="24/7 Human help" 
          />
          <FeatureItem 
            icon={<FaShieldAlt />} 
            title="Secure Checkout" 
            desc="Encrypted payments" 
          />
          <FeatureItem 
            icon={<FaUndo />} 
            title="Easy Returns" 
            desc="30-day policy" 
          />

        </div>
      </div>
    </section>
  );
}


function FeatureItem({ icon, title, desc }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 group">
      <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-1">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
        <p className="text-[11px] text-gray-500 mt-0.5 uppercase tracking-wider">{desc}</p>
      </div>
    </div>
  );
}

export default OverView;