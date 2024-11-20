import React, { useState } from "react";
import { FaTimes, FaPlus, FaRegTrashAlt } from "react-icons/fa";

export default function CategoryCreate() {
  const [category, setCategory] = useState({ categName: "", file: null });
  const [categoryImages, setCategoryImages] = useState([[]]); 

  const [subCategories, setSubCategories] = useState([{ categName: "", images: [] }]);

  const handleCategoryImageChange = (e) => {
    const files = Array.from(e.target.files); 
    setCategoryImages([files]); 

    setCategory((prev) => ({
      ...prev, 
      file: files,
    }));
  };

  const handleCategoryImageDelete = (index) => {
    const updatedCategoryImages = [...categoryImages];
    updatedCategoryImages[0] = []; 
    setCategoryImages(updatedCategoryImages);
  };

  const handleCategoryNameChange = (e) => {
    setCategory({ ...category, categName: e.target.value });
  };

  const handleAddElement = () => {
    setSubCategories([...subCategories, { categName: "", images: [] }]);
  };

  const handleRemoveElement = (index) => {
    if (subCategories.length > 1) {
      const updatedSubCategories = subCategories.filter((_, i) => i !== index);
      setSubCategories(updatedSubCategories);
    }
  };

  const handleSubCategoryNameChange = (e, index) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[index].categName = e.target.value;
    setSubCategories(updatedSubCategories);
  };

  const handleSubCategoryImageChange = (e, index) => {
    const files = Array.from(e.target.files); 
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[index].images = files; 
    setSubCategories(updatedSubCategories);
  };
  const handleSubCategoryImageDelete = (index, subIndex) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[index].images = updatedSubCategories[index].images.filter((_, i) => i !== subIndex);
    setSubCategories(updatedSubCategories);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Category:", category);
    console.log("Subcategories:", subCategories);
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white px-6 py-2">
   <form onSubmit={handleSubmit}>
      {/* Category Name */}
      <div className="cloning-element mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="mb-1 col-span-2">
          <label htmlFor="categName">Category Name</label>
          <input
            name="categName"
            type="text"
            value={category.categName}
            onChange={handleCategoryNameChange}
            className="w-full text-sm border mt-2 border-gray-200 px-4 py-2 rounded-md shadow-sm outline-none focus:border-[#0085FF] focus:ring focus:ring-[#0098EA] focus:ring-opacity-50 text-sm"
            placeholder="Enter Category Name"
          />
        </div>

        {/* File Input for Category */}
        <div className="mb-3 col-span-2">
          <label htmlFor="file" className="w-full">
            <span>Category Attachment</span>
            <div className="mt-2 text-[#0098EA] border lg:h-[200px] rounded-md justify-center border-dashed border-[#0098EA] flex items-center cursor-pointer">
              <FaPlus className="mr-2" size={40} />
            </div>
            <input
              type="file"
              className="hidden w-full"
              id="file"
              multiple
              onChange={handleCategoryImageChange}
            />
          </label>
          {categoryImages[0]?.length > 0 && (
            <div className="image-preview flex items-center flex-wrap mt-2 gap-2">
              {categoryImages[0].map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="h-[100px] rounded-md w-auto"
                  />
                  <button
                    onClick={() => handleCategoryImageDelete(index)}
                    className="absolute top-0 right-0 bg-[#ff4d4d] text-white rounded-full p-1 m-1"
                    style={{ fontSize: "16px", cursor: "pointer" }}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Subcategory Dynamic Fields */}
      <div className="flex justify-between items-center">
        <h3>Create Sub Categories</h3>
        <div
          onClick={handleAddElement}
          className="text-white bg-[#0098EA] cursor-pointer rounded-lg h-[50px] px-5 py-2.5 text-center flex items-center"
        >
          <FaPlus /> Add
        </div>
      </div>

      {subCategories.map((subCategory, index) => (
        <div key={index} className="cloning-element mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="mb-1 col-span-2">
            <label htmlFor={`categName-${index}`}>Sub Category Name</label>
            <input
              name={`categName-${index}`}
              type="text"
              value={subCategory.categName}
              onChange={(e) => handleSubCategoryNameChange(e, index)}
              className="w-full text-sm border mt-2 border-gray-200 px-4 py-2 rounded-md shadow-sm outline-none focus:border-[#0085FF] focus:ring focus:ring-[#0098EA] focus:ring-opacity-50 text-sm"
              placeholder="Enter Sub Category Name"
            />
          </div>

          {/* File Input for Subcategory */}
          <div className="mb-3 col-span-2">
            <label htmlFor={`file-${index}`} className="w-full">
              <span>Subcategory Attachment</span>
              <div className="mt-2 text-[#0098EA] border lg:h-[200px] rounded-md justify-center border-dashed border-[#0098EA] flex items-center cursor-pointer">
                <FaPlus className="mr-2" size={40} />
              </div>
              <input
                type="file"
                className="hidden w-full"
                id={`file-${index}`}
                multiple
                onChange={(e) => handleSubCategoryImageChange(e, index)}
              />
            </label>

            {subCategory.images?.length > 0 && (
              <div className="image-preview flex items-center flex-wrap mt-2 gap-2">
                {subCategory.images.map((image, subIndex) => (
                  <div key={subIndex} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Subcategory Preview ${subIndex}`}
                      className="h-[100px] rounded-md w-auto"
                    />
                    <button
                      onClick={() => handleSubCategoryImageDelete(index, subIndex)}
                      className="absolute top-0 right-0 bg-[#ff4d4d] text-white rounded-full p-1 m-1"
                      style={{ fontSize: "16px", cursor: "pointer" }}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-span-2 text-right">
            <button
              type="button"
              onClick={() => handleRemoveElement(index)}
              className="text-[#ff4d4d] bg-transparent border-0"
            >
              Remove Subcategory
            </button>
          </div>
        </div>
      ))}

      <div className="flex items-center gap-5 mt-5 mb-5">
        <button className="text-white bg-[#0098EA] rounded-lg h-[50px] px-5 py-2.5 text-center">
          Create Category
        </button>
      </div>
    </form>
    </div>
  );
}
