import React, { useState } from "react";
import { FaTimes, FaPlus, FaRegTrashAlt } from "react-icons/fa";

export default function CategoryCreate() {
  const [items, setItems] = useState([]);
  const [categoryImages, setCategoryImages] = useState([]);

  const handleAddElement = () => {
    setItems((prev) => [...prev, { id: prev.length }]);
    setCategoryImages((prev) => [...prev, []]);
  };

  const handleImageChange = (e, index) => {
    const files = Array.from(e.target.files);
    setCategoryImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = [...newImages[index], ...files];
      return newImages;
    });
  };

  const handleImageDelete = (index, imageIndex) => {
    setCategoryImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = newImages[index].filter((_, i) => i !== imageIndex);
      return newImages;
    });
  };
  const removeElem = (ind) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== ind)); // Remove category
    setCategoryImages((prevImages) => prevImages.filter((_, i) => i !== ind)); // Remove associated images
  };
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white px-6 py-2">
      <form>
        <div className="cloning-element mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="mb-1 col-span-2">
            <label htmlFor="categName">Category Name</label>
            <input
              name="categName"
              type="text"
              autoComplete="off"
              className="w-full text-sm border mt-2 border-gray-200 px-4 py-2 rounded-md shadow-sm outline-none focus:border-[#0085FF] focus:ring focus:ring-[#0098EA] focus:ring-opacity-50 text-sm"
              placeholder="Enter Category Name"
            />
          </div>
          <div className="mb-3 col-span-2">
            <label htmlFor="file" className="w-full">
              <span>Attachment</span>
              <div className="mt-2 text-[#0098EA] border lg:h-[200px] rounded-md justify-center border-dashed border-[#0098EA] flex items-center cursor-pointer">
                <FaPlus className="mr-2" size={40} />
              </div>
              <input
                type="file"
                className="hidden w-full"
                id="file"
                multiple
                onChange={(e) => handleImageChange(e, 0)}
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
                      onClick={() => handleImageDelete(0, index)}
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
        {items.length > 0 &&
          items.map((elem, i) => (
            <div
              key={i}
              className="insert-element mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2"
            >
              <div className="mb-1 col-span-2">
                <div className="flex items-center justify-between">
                  <label htmlFor={`categName-${elem.id}`}>Category Name</label>
                  <div
                    onClick={() => removeElem(i)}
                    className="text-white bg-red-400 cursor-pointer rounded-lg h-[50px] w-[50px] px-5 py-2.5 text-center flex items-center"
                  >
                    <FaRegTrashAlt size={25} />
                  </div>
                </div>
                <input
                  name={`categName-${elem.id}`}
                  type="text"
                  autoComplete="off"
                  className="w-full text-sm border mt-2 border-gray-200 px-4 py-2 rounded-md shadow-sm outline-none focus:border-[#0085FF] focus:ring focus:ring-[#0098EA] focus:ring-opacity-50 text-sm"
                  placeholder="Enter Category Name"
                />
              </div>

              <div className="mb-3 col-span-2">
                <label htmlFor={`file-${elem.id}`} className="w-full">
                  <span>Attachment</span>
                  <div className="mt-2 text-[#0098EA] border lg:h-[200px] rounded-md justify-center border-dashed border-[#0098EA] flex items-center cursor-pointer">
                    <FaPlus className="mr-2" size={40} />
                  </div>
                  <input
                    type="file"
                    className="hidden w-full"
                    id={`file-${elem.id}`}
                    multiple
                    onChange={(e) => handleImageChange(e, i)} // Handle images for specific category
                  />
                </label>

                {categoryImages[i]?.length > 0 && (
                  <div className="image-preview flex items-center flex-wrap mt-2 gap-2">
                    {categoryImages[i].map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index}`}
                          className="h-[100px] rounded-md w-auto"
                        />
                        <button
                          onClick={() => handleImageDelete(i, index)}
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
          ))}
             <div className="flex justify-between items-center">
          <h3>Create Sub Categories</h3>
          <div
            onClick={handleAddElement}
            className="text-white bg-[#0098EA] cursor-pointer rounded-lg h-[50px] px-5 py-2.5 text-center flex items-center"
          >
            <FaPlus /> Add
          </div>
        </div>
        <div className="flex items-center gap-5 mt-5 mb-5">
          <button className="text-white bg-[#0098EA] rounded-lg h-[50px] px-5 py-2.5 text-center">
            Create Category
          </button>
        </div>
      </form>
    </div>
  );
}
