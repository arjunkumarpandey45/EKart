import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ProductCard from './ProductCard';
import { LayoutGrid, SlidersHorizontal, ShoppingBag, ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered data ke liye
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/product/allproducts`);
        if (res.data.success) {
          setProducts(res.data.products);
          setFilteredProducts(res.data.products); // Initial state
        }
      } catch (err) {
        toast.error("Server connection failed!");
      } finally {
        setLoading(false);
      }
    };
    getAllProducts();
  }, []);

  const handleSort = (value) => {
    let sorted = [...filteredProducts];
    if (value === "low") {
      sorted.sort((a, b) => a.productPrice - b.productPrice);
    } else if (value === "high") {
      sorted.sort((a, b) => b.productPrice - a.productPrice);
    }
    setFilteredProducts(sorted);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] pt-28 pb-20 px-6 md:px-16">
      <div className="max-w-[1500px] mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
              The <span className="text-indigo-600">Store.</span>
            </h1>
            <p className="text-slate-400 font-medium text-lg">
              {filteredProducts.length} Products found in the catalog.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-4">
        
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <Select onValueChange={handleSort}>
                <SelectTrigger className="w-[160px] border-none focus:ring-0 shadow-none font-bold text-sm bg-transparent">
                  <SelectValue placeholder="Sort By Price" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-100">
                  <SelectItem value="low">Low to High</SelectItem>
                  <SelectItem value="high">High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <button className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-2xl shadow-lg font-bold text-sm hover:bg-indigo-600 transition-all active:scale-95">
              <SlidersHorizontal className="w-4 h-4" />
              All Filters
            </button>
          </div>
        </div>

        {/* --- PRODUCTS GRID --- */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[400px] bg-slate-200/50 animate-pulse rounded-[2.5rem]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredProducts.map((p) => (
              <ProductCard key={p._id} item={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;