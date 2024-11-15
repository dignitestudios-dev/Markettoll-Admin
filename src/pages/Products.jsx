import React, { useEffect } from 'react'
import ProductList from '../components/Product/ProductList';
import ProductFilter from '../components/Product/Filter';
export default function Products() {
    useEffect(() => {
        const scrollToTop = () => {
          window.scrollTo(0,0);
          document.title = "BCT - Users";
        };
        scrollToTop()
      }, []);
    
      return (
        <div className="w-full flex flex-col gap-y-4">
            <h1 className="text-xl font-bold">Products</h1>
          <ProductFilter/>
          <ProductList />
        </div>
      );
}
