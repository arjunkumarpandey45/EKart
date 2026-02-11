import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ProductCard from './ProductCard';
import FilterBar from './FilterBar'; // Humara alag component
import { ArrowUpDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState(2000900000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/product/allproducts`);
        if (res.data.success) setProducts(res.data.products);
      } catch (err) {
        toast.error("Server connection failed!");
      } finally {
        setLoading(false);
      }
    };
    getAllProducts();
  }, []);

  // --- Dynamic Data Extraction ---
  const dynamicCategories = useMemo(() => [...new Set(products.map(p => p.category))], [products]);
  const dynamicBrands = useMemo(() => [...new Set(products.map(p => p.brand))], [products]);

  // --- Core Filtering & Sorting Logic ---
  const filteredProducts = useMemo(() => {
    let result = products.filter(item => {
      const matchCategory = selectedCategory ? item.category === selectedCategory : true;
      const matchPrice = item.productPrice <= priceRange;
      const matchBrand = selectedBrands.length > 0 ? selectedBrands.includes(item.brand) : true;
      return matchCategory && matchPrice && matchBrand;
    });

    if (sortOrder === "low") result.sort((a, b) => a.productPrice - b.productPrice);
    if (sortOrder === "high") result.sort((a, b) => b.productPrice - a.productPrice);

    return result;
  }, [products, selectedCategory, priceRange, selectedBrands, sortOrder]);

  return (
    <div className="min-h-screen bg-[#f8f9fb] pt-28 pb-20 px-6 md:px-16">
      <div className="max-w-[1600px] mx-auto">
        
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Filter Sidebar */}
          <FilterBar 
            categories={dynamicCategories}
            brands={dynamicBrands}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
          />

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
              <div className="space-y-1">
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter">The <span className="text-indigo-600">Store.</span></h1>
                <p className="text-slate-400 font-medium">{filteredProducts.length} Items found</p>
              </div>

              {/* Sorting Tool */}
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
                <ArrowUpDown className="w-4 h-4 text-slate-400" />
                <Select onValueChange={(val) => setSortOrder(val)}>
                  <SelectTrigger className="w-[160px] border-none focus:ring-0 shadow-none font-bold text-sm bg-transparent">
                    <SelectValue placeholder="Sort By Price" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-100">
                    <SelectItem value="low">Low to High</SelectItem>
                    <SelectItem value="high">High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => <div key={i} className="h-80 bg-slate-200/50 animate-pulse rounded-[2.5rem]" />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((p) => <ProductCard key={p._id} item={p} />)}
              </div>
            )}

            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                <p className="text-slate-400 font-bold italic">No products match your filters! 🔍</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;