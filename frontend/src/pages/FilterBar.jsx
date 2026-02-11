import React from 'react'
import { Filter, RotateCcw, ChevronRight } from "lucide-react"

const FilterBar = ({ 
  categories, 
  brands, 
  selectedCategory, 
  setSelectedCategory, 
  priceRange, 
  setPriceRange, 
  selectedBrands, 
  toggleBrand,
  resetFilters 
}) => {
  return (
    <div className="w-full lg:w-80 bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm h-fit sticky top-28">
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Filters</h2>
        </div>
        <button 
          onClick={resetFilters}
          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
          title="Reset All"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* --- Dynamic Categories --- */}
      <div className="mb-10">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Categories</p>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat === selectedCategory ? "" : cat)}
              className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all group ${
                selectedCategory === cat 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" 
                : "bg-transparent text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="text-sm font-bold">{cat}</span>
              <ChevronRight className={`w-4 h-4 transition-transform ${selectedCategory === cat ? "rotate-90" : "opacity-0 group-hover:opacity-100"}`} />
            </button>
          ))}
        </div>
      </div>

      {/* --- Dynamic Brands (Checkboxes) --- */}
      <div className="mb-10">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Popular Brands</p>
        <div className="grid grid-cols-1 gap-2">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => toggleBrand(brand)}
              className={`flex items-center gap-3 p-3 rounded-2xl border text-sm font-bold transition-all ${
                selectedBrands.includes(brand)
                ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                : "border-slate-50 text-slate-500 hover:bg-slate-50"
              }`}
            >
              <div className={`w-4 h-4 rounded-md border transition-colors ${
                selectedBrands.includes(brand) ? "bg-indigo-600 border-indigo-600" : "bg-transparent border-slate-300"
              }`} />
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* --- Price Range Slider --- */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Max Price</p>
          <span className="text-sm font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
            ₹{priceRange.toLocaleString()}
          </span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="300000000" 
          step="50000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
      </div>
    </div>
  )
}

export default FilterBar;