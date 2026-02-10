import React, { useState } from 'react';
import { Maximize2, ShoppingCart } from "lucide-react";
import ProductModal from './ProductModal'; 

const ProductCard = ({ item }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImg = (e) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % item.productImg.length);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev - 1 + item.productImg.length) % item.productImg.length);
  };

  return (
    <>
      <div 
        onClick={() => setIsZoomed(true)}
        className="group flex flex-col bg-white p-3 rounded-[2.5rem] border border-transparent hover:border-slate-100 hover:shadow-xl transition-all duration-500 cursor-pointer"
      >
        <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-slate-50 flex items-center justify-center p-8 mb-4">
          <img 
            src={item.productImg[0]?.url || item.productImg[0]} 
            className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
            alt={item.productName}
          />
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-2 rounded-full shadow-sm">
            <Maximize2 className="w-4 h-4 text-slate-600" />
          </div>
        </div>

        <div className="px-2 pb-2">
          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{item.brand}</span>
          <h3 className="text-base font-bold text-slate-800 line-clamp-1 mb-2">{item.productName}</h3>
          <div className="flex items-center justify-between">
            <span className="text-xl font-black text-slate-900">₹{item.productPrice.toLocaleString('en-IN')}</span>
            <div className="h-10 w-10 bg-slate-900 text-white rounded-xl flex items-center justify-center group-hover:bg-indigo-600">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {isZoomed && (
        <ProductModal 
          item={item} 
          currentImg={currentImg} 
          nextImg={nextImg} 
          prevImg={prevImg} 
          onClose={() => setIsZoomed(false)} 
        />
      )}
    </>
  );
};

export default ProductCard;