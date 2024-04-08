import React, { useState } from "react";
import { Icon } from "@iconify-icon/react";

function RejectedRowDetails({ data, onClose }) {
  const handleOnClose = () => {
    onClose();
  };

  const [activeIndex, setActiveIndex] = useState(-1);

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
        <button className="px-8 py-1 bg-red-600 text-white rounded-lg">
          Rejeted
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
          Back
        </button>
      </div>
    </>
  );
}

export default RejectedRowDetails;
