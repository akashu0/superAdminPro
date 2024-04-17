import React, { useState, useEffect, useRef } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "./SearchMenu.css";

const SearchMenu = () => {
  const [categoryOptionsOpen, setCategoryOptionsOpen] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([
    "Category 1",
    "Category 2",
  ]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([
    "Sub Category 1",
    "Sub Category 2",
  ]);
  const [productOptions, setProductOptions] = useState([
    "Product 1",
    "Product 2",
  ]);
  const [subCategoryOptionsOpen, setSubCategoryOptionsOpen] = useState(false);
  const [productOptionsOpen, setProductOptionsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setCategoryOptionsOpen(false);
        setSubCategoryOptionsOpen(false);
        setProductOptionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleCategoryOptions = () => {
    setCategoryOptionsOpen(!categoryOptionsOpen);
    setSubCategoryOptionsOpen(false);
    setProductOptionsOpen(false);
  };

  const toggleSubCategoryOptions = () => {
    setSubCategoryOptionsOpen(!subCategoryOptionsOpen);
    setCategoryOptionsOpen(false);
    setProductOptionsOpen(false);
  };

  const toggleProductOptions = () => {
    setProductOptionsOpen(!productOptionsOpen);
    setCategoryOptionsOpen(false);
    setSubCategoryOptionsOpen(false);
  };

  return (
    <div>
      <div className="menu-main-container" ref={menuRef}>
        <div className="menu-main-container-items" onClick={toggleCategoryOptions}>
          <div>Category</div>
          <div className="dropdown">
            {categoryOptionsOpen ? (
              <ExpandLessIcon onClick={toggleCategoryOptions} />
            ) : (
              <ExpandMoreIcon onClick={toggleCategoryOptions} />
            )}
            {categoryOptionsOpen && (
              <div className="dropdown-content">
                {categoryOptions.map((item) => (
                  <p>{item}</p>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="menu-main-container-items" onClick={toggleSubCategoryOptions} >
          <div>Sub Category</div>
          <div className="dropdown">
            {subCategoryOptionsOpen ? (
              <ExpandLessIcon onClick={toggleSubCategoryOptions} />
            ) : (
              <ExpandMoreIcon onClick={toggleSubCategoryOptions} />
            )}
            {subCategoryOptionsOpen && (
              <div className="dropdown-content">
                {subCategoryOptions.map((item) => (
                  <p>{item}</p>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="menu-main-container-items" onClick={toggleProductOptions} >
          <div>Product</div>
          <div className="dropdown">
            {productOptionsOpen ? (
              <ExpandLessIcon onClick={toggleProductOptions} />
            ) : (
              <ExpandMoreIcon onClick={toggleProductOptions} />
            )}
            {productOptionsOpen && (
              <div className="dropdown-content">
                {productOptions.map((item) => (
                  <p>{item}</p>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="menu-main-container-items">
          <div>From:</div>
          <input type="date" name="" id="" className="bg-blue-50 border rounded focus:outline-blue-900 cursor-pointer" />
        </div>
        <div className="menu-main-container-items">
          <div>To:</div>
          <input type="date" name="" id="" className="bg-blue-50 border rounded focus:outline-blue-900 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default SearchMenu;
