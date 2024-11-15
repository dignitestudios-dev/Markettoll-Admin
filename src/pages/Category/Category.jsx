import React, { useEffect } from "react";
import CategoryList from "../../components/Category/CategoryList";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate=useNavigate("")
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0,0);
      document.title = "BCT - Users";
    };
    scrollToTop()
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-4">
        <div className="flex justify-between items-center" >
         <h1 className="text-xl font-bold">Category</h1>
         <button 
         onClick={()=>navigate("/createcategory")}
        class={`active:scale-95 rounded-md px-6 py-2 text-sm font-medium text-white outline-none focus:ring  hover:opacity-90 bg-[#0098EA]`}
      >
        Create Category
      </button>
        </div>
      <CategoryList />
    </div>
  );
};

export default Category;
