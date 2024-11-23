import React, { useContext, useState } from "react";
import { FaTimes, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../constants/BaseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CategoryCreate() {
  const { isUserData } = useContext(AuthContext);
  const token = isUserData?.token;
  const [category, setCategory] = useState("");
  const [categoryImages, setCategoryImages] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategName, setSubCategName] = useState([]);
  const navigate=useNavigate("")

  const handleCategoryImageChange = (e) => {
    const files = Array.from(e.target.files);
    setCategoryImages(files);
  };
  
  const handleCategoryNameChange = (e) => {
    setCategory(e.target.value);
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
    const updatedSubCategName = [...subCategName];
    console.log("updatedSubCategName >>>>>", updatedSubCategName);
    updatedSubCategName[index] = e.target.value;
    setSubCategName(updatedSubCategName);
    setSubCategories(updatedSubCategories);
  };

  const handleSubCategoryImageChange = (e, index) => {
    const files = Array.from(e.target.files);
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[index].images = files;
    setCategoryImages((prev) => [...prev, files[0]]);
    setSubCategories(updatedSubCategories);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryImages.length>0) {
      toast.error("Category Image Are Required", {
        type: "error",
        autoClose: 3000,
        position: "top-right",
      });
      return;
    }
    if (!subCategName.length>0) {
      toast.error("Please Add Atleast 1 Sub Category", {
        type: "error",
        autoClose: 3000,
        position: "top-right",
      });
      return;
    }

    const subCategoryImageError = subCategories.some((item) => item.images.length === 0);
    if (subCategoryImageError) {
      toast.error("Sub Category Images are Required", {
        type: "error",
        autoClose: 3000,
        position: "top-right",
      });
      return;
    }
   
    const loadingToastId = toast.loading("Submitting...");
    const formData = new FormData();
    formData.append("categoryName", category);
    formData.append("subcategoryNames", JSON.stringify(subCategName));
    for (const image of categoryImages) {
      formData.append("images", image);
    }
  
    fetch(`${BASE_URL}/admin/category-subcategory`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            throw new Error(errorData.message || "Something went wrong!");
          });
        }
        return res.json();
      })
      .then((data) => {
        toast.update(loadingToastId, {
          render: "Success! Category created.",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          position: "top-right",
        })
        navigate("/category")
      })
      .catch((err) => {
        toast.update(loadingToastId, {
          render: `Error: ${err.message}`,
          type: "error",
          isLoading: false,
          autoClose: 5000,
          position: "top-right",
        });
      });
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
              value={category}
              required
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
                onChange={handleCategoryImageChange}
              />
            </label>
            {categoryImages.length > 0 && (
              <div className="image-preview flex items-center flex-wrap mt-2 gap-2">
                {/* {categoryImages.map((image, index) => ( */}
                <div className="relative">
                  <img
                    src={URL.createObjectURL(categoryImages[0])}
                    alt={`Preview`}
                    className="h-[100px] rounded-md w-auto"
                  />
                </div>
                {/* ))} */}
              </div>
            )}
          </div>
        </div>
        {/* Subcategory Dynamic Fields */}
        {subCategories.map((subCategory, index) => (
          <div
            key={index}
            className="cloning-element mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2"
          >
            <div className="col-span-2 text-right">
              <button
                type="button"
                onClick={() => handleRemoveElement(index)}
                className="text-[#ff4d4d] bg-transparent border-0"
              >
                Remove Subcategory
              </button>
            </div>
            <div className="mb-1 col-span-2">
              <label htmlFor={`categName-${index}`}>Sub Category Name</label>
              <input
                name={`categName-${index}`}
                type="text"
                required
                value={subCategory?.categName}
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
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mt-2">
          <h3>Create Sub Categories</h3>
          <div
            onClick={handleAddElement}
            className="text-white bg-[#0098EA] cursor-pointer rounded-lg h-[50px] px-5 py-2.5 text-center flex items-center"
          >
            <FaPlus /> Add
          </div>
        </div>
        <div className="flex items-center gap-5 mt-5 mb-5">
          <button
            type="submit"
            className="text-white bg-[#0098EA] rounded-lg h-[50px] px-5 py-2.5 text-center"
          >
            Create Category
          </button>
        </div>
      </form>
    </div>
  );
}
