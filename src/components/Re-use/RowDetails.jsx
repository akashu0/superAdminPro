import React, { useState } from "react";
import { Icon } from "@iconify-icon/react";
import deleteIcon from "../../assets/delete.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RowDetails({ data, onClose }) {
  const handleOnClose = () => {
    onClose();
  };

  const [activeIndex, setActiveIndex] = useState(-1);

  const [showRejectModal, setShowRejectModal] = useState(false);

  const handleOnClick = () => {
    setShowRejectModal(true);
  };

  const handleClose = () => {
    setShowRejectModal(false);
  };

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  const accordionData = [
    {
      title: "Company Information",
      content: (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <p className="font-santoshi m-0">Company Name</p>
            <span className="font-semibold">{data.companyName}</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-santoshi m-0">Owner Name</p>
            <span className="font-semibold">{data.OwnerName}</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-santoshi m-0">Place</p>
            <span className="font-semibold">{data.state}</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-santoshi m-0">Registration Number</p>
            <span className="font-semibold">{data.registrationNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-santoshi m-0">Business Type</p>
            <span className="font-semibold">{data.businessType}</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-santoshi m-0">Year of Establishment</p>
            <span className="font-semibold">{data.yearOfRegister}</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-santoshi m-0">Total Employee</p>
            <span className="font-semibold">{data.totalEmployees}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Contact Information",
      content: (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <p className="font-santoshi m-0">Company Email</p>
            <span className="font-semibold">{data.companyEmail}</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-santoshi m-0">Contact Number</p>
            <span className="font-semibold">{data.contactNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-santoshi m-0">Address</p>
            <span className="font-semibold">
              {data.address1} {data.address2}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-santoshi m-0">City</p>
            <span className="font-semibold">{data.city}</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-santoshi m-0">State</p>
            <span className="font-semibold">{data.state}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Documents",
      content: (
        <div>
          <ul>
            {data.documents.map((document, index) => (
              <li key={index}>{document}</li>
            ))}
          </ul>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="pt- px-5 gap-3 bg-transparent flex items-center">
        <Icon
          icon="oui:arrow-left"
          className="bg-blue-900 text-white text-xl cursor-pointer"
          onClick={handleOnClose}
        />

        <h1 className="text-lg text-blue-900 font-semibold bg-transparent font-santoshi">
          Company Information
        </h1>
        <button className="px-8 py-1 bg-green-600 text-white rounded-lg">
          Verified
        </button>
      </div>
      <div className="pt-3 ml-7  bg-transparent">
        <hr className="border-black" />
      </div>

      <div className="mt-5 flex  flex-col mx-10  m-auto rounded-xl ">
        {accordionData.map((item, index) => (
          <div
            key={index}
            className={`mt-3 rounded-xl  border border-neutral-200 bg-white dark:bg-body-dark ${
              index === 0 ? "rounded-xl" : index === accordionData.length - 1
            } `}
          >
            <h2
              className="mb-0 font-bold font-santoshi rounded-xl"
              id={`heading${index + 1}`}
            >
              <button
                className={`group relative flex w-full rounded-xl items-center rounded-t-lg border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition overflow-anchor-none hover:z-[2] focus:z-[3] focus:outline-none dark:bg-body-dark dark:text-black ${
                  activeIndex === index
                    ? "bg-white text-primary shadow-border-b dark:bg-surface-dark dark:text-primary dark:shadow-white/10"
                    : ""
                }`}
                type="button"
                data-twe-collapse-init
                data-twe-target={`#collapse${index + 1}`}
                aria-expanded={activeIndex === index ? "true" : "false"}
                aria-controls={`collapse${index + 1}`}
                onClick={() => toggleAccordion(index)}
              >
                {item.title}
                <span
                  className={`-me-1 ms-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out group-data-twe-collapse-collapsed:me-0 group-data-twe-collapse-collapsed:rotate-0 motion-reduce:transition-none ${
                    activeIndex === index ? "" : "rotate-180"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </button>
            </h2>
            <div
              id={`collapse${index + 1}`}
              className={`!visible   ${
                activeIndex === index ? "" : "hidden"
              } transition duration-300`}
              data-twe-collapse-item
              aria-labelledby={`heading${index + 1}`}
            >
              <div className="px-5 py-4 w-[600px] rounded-lg h-auto m-auto mb-5 bg-white border ">
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end  my-5 mx-14">
        <button
          className="border border-gray-600 bg-white hover:bg-blue-100 px-5  font-santoshi h-10 rounded-md  text-gray-600"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="border bg-red-600 hover:bg-red-400 px-5 mx-4 font-santoshi h-10 rounded-md  text-white"
          onClick={handleOnClick}
        >
          Reject
        </button>
      </div>

      {showRejectModal && <RejectedModal data={data} onClose={handleClose} />}
      <ToastContainer />
    </>
  );
}

export default RowDetails;

const RejectedModal = ({ data, onClose }) => {
  const navigate = useNavigate();
  const companyId = data?._id;

  const handleClose = (event) => {
    if (event.target.id === "container") {
      onClose();
    }
  };

  const [text, setText] = useState("");
  const apiURL = process.env.REACT_APP_API_URL;

  const handleRejectedConfirm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${apiURL}/admin/rejected-company/${companyId}`,
        {
          text: text,
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          toast.success(response.data.message);
          navigate("/");
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating company:", error.message);
    }
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  return (
    <div
      id="container"
      className="fixed top-0 left-0 w-full h-full  flex items-center justify-center bg-gray-800 bg-opacity-50"
      onClick={handleClose}
    >
      <div className="bg-blue-100 w-[700px] p-8 rounded-md">
        <div className="flex gap-5 ">
          <img src={deleteIcon} className="h-10" alt="" />
          <h2 className="text-2xl font-bold py-2 font-santoshi ">
            {data?.companyName}
          </h2>
        </div>
        <div className="">
          <p className="font-santoshi">
            Are you sure you want to reject this why?
          </p>
          <textarea
            className="w-full mt-3 rounded-xl font-santoshi text-gray-400 p-4 focus:outline-none"
            placeholder="For what reason is this company being rejecting?"
            cols="30"
            name="text"
            value={text}
            rows="10"
            onChange={handleTextChange}
          ></textarea>
        </div>
        <div className="flex justify-end gap-5 mt-2 ">
          <button
            onClick={onClose}
            className="bg-transparent hover:bg-blue-50 border border-gray-500 text-gray-800 px-7 py-2  rounded-md"
          >
            Cancel
          </button>
          <button
            className="bg-blue-900 hover:bg-blue-600 text-white px-7  py-2 rounded-md"
            onClick={handleRejectedConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
