import React, { useEffect, useRef, useState } from "react";
import SearchMenu from "../Re-use/SearchMenu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { FcCancel } from "react-icons/fc";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TipsComponents({ data }) {
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

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);

  const [clickedItem, setClickedItem] = useState(null);

  const handleOnClick = (item) => {
    setClickedItem(item);
    setShowRejectModal(true);
  };

  const handleClose = () => {
    setClickedItem(null);
    setShowRejectModal(false);
  };
  const handleClosePublish = () => {
    setClickedItem(null);
    setShowPublishModal(false);
  };

  const handleOnClickPublish = (item) => {
    setClickedItem(item);
    setShowPublishModal(true);
  };

  return (
    <>
      {/* Search Sections */}
      <div className="menu-main-container " ref={menuRef}>
        <div
          className="menu-main-container-items"
          onClick={toggleCategoryOptions}
        >
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
        <div
          className="menu-main-container-items"
          onClick={toggleSubCategoryOptions}
        >
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
        <div
          className="menu-main-container-items"
          onClick={toggleProductOptions}
        >
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
          <input
            type="date"
            name=""
            id=""
            className="bg-blue-50 border rounded focus:outline-blue-900 cursor-pointer"
          />
        </div>
        <div className="menu-main-container-items">
          <div>To:</div>
          <input
            type="date"
            name=""
            id=""
            className="bg-blue-50 border rounded focus:outline-blue-900 cursor-pointer"
          />
        </div>
      </div>

      <div className="h-[300px]  w-full  overflow-y-auto">
        {data.map((item, index) => (
          <>
            <div className="mt-5 ml-3  bg-white mx-7 rounded-md p-3 ">
              <div key={index} className="flex justify-between items-center ">
                <div className="flex justify-start gap-2">
                  <img
                    src={item?.productId?.sections1?.productImage[0]?.base64}
                    alt="Product"
                    className="w-20 h-20 shadow-md rounded-sm"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-santoshi font-semibold text-sm text-blue-900">
                      {item?.productId?.sections1?.productDetails?.productName}
                    </h1>
                    <div className="flex flex-row gap-3">
                      <p className="text-sm text-blue-900 font-santoshi pt-5 underline cursor-pointer">
                        Product Details
                      </p>
                      <p className="text-sm pt-5 text-blue-900 font-santoshi underline cursor-pointer">
                        User Details
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-5 space-x-5">
                  <button
                    className="px-7 py-1 rounded-md font-santoshi border border-black"
                    onClick={() => handleOnClick(item)}
                  >
                    Reject
                  </button>
                  <button
                    className="px-7 py-1 rounded-md font-santoshi bg-blue-900 text-white"
                    onClick={() => handleOnClickPublish(item)}
                  >
                    Publish
                  </button>
                </div>
              </div>
              <p className="pt-2 font-santoshi font-semibold">
                Tips:{" "}
                <span className="font-santoshi font-normal">{item?.tips}</span>
              </p>
            </div>
          </>
        ))}
      </div>
      {showRejectModal && (
        <RejectedModal item={clickedItem} onClose={handleClose} />
      )}
      {showPublishModal && (
        <PublishModal item={clickedItem} onClose={handleClosePublish} />
      )}
      <ToastContainer />
    </>
  );
}

export default TipsComponents;

const RejectedModal = ({ item, onClose }) => {
  const handleClose = (event) => {
    if (event.target.id === "container") {
      onClose();
    }
  };

  const id = item?._id;

  const apiURL = process.env.REACT_APP_API_URL;

  const handleConfirm = async (status) => {
    try {
      const response = await axios.put(
        `${apiURL}/superAdmin/updateStatus/${id}`,
        {
          status: status,
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        onClose();
      } else {
        toast.error(response.data.message);
        onClose();
      }
    } catch (error) {
      console.error("Error updating company:", error.message);
    }
  };

  return (
    <div
      id="container"
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 "
      onClick={handleClose}
    >
      <div className="bg-blue-100 w-[700px] p-8  gap-5 rounded-md flex flex-col items-center justify-center ">
        <FcCancel className="w-10 h-20" />

        <p className="text-center font-semibold font-santoshi text-gray-600  ">
          Are you sure you want to Reject the product Buying Tips?
        </p>

        <div className="flex gap-5 mt-2">
          <button
            onClick={onClose}
            className="bg-transparent hover:bg-blue-50 border border-gray-500 text-gray-800 px-7 py-2 rounded-md"
          >
            Cancel{" "}
          </button>
          <button
            className="bg-blue-900 hover:bg-blue-600 text-white px-7 py-2 rounded-md"
            onClick={() => handleConfirm("rejected")}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const PublishModal = ({ item, onClose }) => {
  const handleClose = (event) => {
    if (event.target.id === "container") {
      onClose();
    }
  };

  const id = item?._id;
  const apiURL = process.env.REACT_APP_API_URL;

  const handleConfirm = async (status) => {
    try {
      const response = await axios.put(
        `${apiURL}/superAdmin/updateStatus/${id}`,
        {
          status: status,
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        onClose();
      } else {
        toast.error(response.data.message);
        onClose();
      }
    } catch (error) {
      console.error("Error updating company:", error.message);
    }
  };

  return (
    <div
      id="container"
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 "
      onClick={handleClose}
    >
      <div className="bg-blue-100 w-[700px] p-8  gap-5 rounded-md flex flex-col items-center justify-center ">
        <MdOutlinePublishedWithChanges className="w-10 h-20 text-green-600" />

        <p className="text-center font-semibold font-santoshi text-gray-600  ">
          Are you sure you want to Pulish the Product Buying Tips?
        </p>

        <div className="flex gap-5 mt-2">
          <button
            onClick={onClose}
            className="bg-transparent hover:bg-blue-50 border border-gray-500 text-gray-800 px-7 py-2 rounded-md"
          >
            Cancel{" "}
          </button>
          <button
            className="bg-blue-900 hover:bg-blue-600 text-white px-7 py-2 rounded-md"
            onClick={() => handleConfirm("published")}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
