import React, { useEffect, useState } from 'react'
import ProductList from '../components/Product/ProductList';
import {ProductFilter} from '../components/Product/Filter';
export default function Products() {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.title = "Market-Toll - Products";
    };
    scrollToTop()
  }, []);
  const [filterData, setFilterData] = useState([])
  return (
    <div className="w-full flex flex-col gap-y-4">
      <h1 className="text-xl font-bold">Products</h1>
      <ProductFilter setFilterData={setFilterData} />
      <ProductList filterData={filterData} />
    </div>
  );
}
