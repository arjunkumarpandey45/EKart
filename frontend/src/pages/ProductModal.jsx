import React from 'react';
import { X, ChevronLeft, ChevronRight, Star, ShieldCheck, Truck, ShoppingCart } from "lucide-react";

const ProductModal = ({ item, currentImg, nextImg, prevImg, onClose }) => {
  return (
    <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
      <div className="relative w-full max-w-7xl bg-white rounded-[3rem] overflow-hidden flex flex-col md:flex-row h-[95vh] md:h-[85vh] shadow-2xl animate-in zoom-in-95 duration-500">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-100/50 hover:bg-slate-200 backdrop-blur-md rounded-full text-slate-800 z-50 transition-all shadow-md"
        >
          <X className="w-6 h-6" />
        </button>

        {/* LEFT: Big Image Section */}
        <div className="w-full md:w-1/2 bg-white relative flex items-center justify-center border-r border-slate-100 overflow-hidden">
          <button onClick={prevImg} className="absolute left-6 p-4 bg-white/90 hover:bg-white rounded-full shadow-lg z-10 transition-transform active:scale-90">
            <ChevronLeft className="w-6 h-6 text-slate-800" />
          </button>

          <div className="w-full h-full p-4 md:p-0 flex items-center justify-center">
            <img 
              src={item.productImg[currentImg]?.url || item.productImg[currentImg]} 
              className="w-full h-full object-contain md:scale-80 transition-transform duration-500" 
              alt="Zoomed Detail"
            />
          </div>

          <button onClick={nextImg} className="absolute right-6 p-4 bg-white/90 hover:bg-white rounded-full shadow-lg z-10 transition-transform active:scale-90">
            <ChevronRight className="w-6 h-6 text-slate-800" />
          </button>

          <div className="absolute bottom-8 flex gap-2 z-10">
            {item.productImg.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all shadow-sm ${i === currentImg ? 'w-10 bg-indigo-600' : 'w-2 bg-slate-300'}`} />
            ))}
          </div>
        </div>

        {/* RIGHT: Detailed Info Section */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col overflow-y-auto bg-white">
          <div className="mb-8">
            <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-[0.2em]">
              {item.brand}
            </span>
            <h2 className="text-4xl md:text-2xl font-black text-slate-900 mt-6 tracking-tighter leading-[1.1]">
              {item.productName}
            </h2>
          </div>

          <div className="mb-10">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Current Price</span>
            <p className="text-3xl font-black text-slate-900 tracking-tight">₹{item.productPrice.toLocaleString('en-IN')}</p>
          </div>

          <div className="mb-10">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">About this item</p>
            <p className="text-slate-600 leading-relaxed text-base font-medium">
              {item.productDisc}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="flex flex-col gap-2 p-5 bg-slate-50 rounded-[2rem] border border-slate-100">
              <ShieldCheck className="w-8 h-8 text-indigo-600" />
              <span className="text-sm font-bold text-slate-800">1 Year Warranty</span>
            </div>
            <div className="flex flex-col gap-2 p-5 bg-slate-50 rounded-[2rem] border border-slate-100">
              <Truck className="w-8 h-8 text-indigo-600" />
              <span className="text-sm font-bold text-slate-800">Express Delivery</span>
            </div>
          </div>

          <button className="w-full h-16 bg-slate-900 text-white rounded-[1.5rem] font-black text-lg hover:bg-indigo-600 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
            <ShoppingCart className="w-6 h-6" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;