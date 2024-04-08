import React, { useEffect, useMemo, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "./Table";

function CategoriyList() {
  const navigate = useNavigate();
  const DropDownList = ["All", "Active", "In Active"];
  const [selectedButton, setSelectedButton] = useState(DropDownList[0]);

  //   const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [list, setList] = useState([]);

  const columns = [
    {
      header: "Type Name",
      accessorKey: "type",
    },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Sub category",
      accessorKey: "subCategories",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
  ];

  const apiURL = process.env.REACT_APP_API_URL;

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiURL}/category/getAllCategory`);

      // console.log(response.data);
      setList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const transformData = (data) => {
    return data.map((item) => ({
      ...item,
      subCategories: item?.subcategories?.join(", "), // Convert subcategories array to comma-separated string
    }));
  };
  // Apply filtering to the transformed data
  const filteredData = useMemo(() => {
    switch (selectedButton) {
      case "All":
        return transformData(list); // Transform the entire list
      case "Active":
        return transformData(list.filter((item) => item.status === "Active"));
      case "In Active":
        return transformData(list.filter((item) => item.status === "Inactive"));
      default:
        return []; // Return an empty array for unknown button values
    }
  }, [list, selectedButton]);

  const renderComponent = () => {
    if (loading) {
      return smallSpiner();
    } else if (filteredData.length === 0) {
      return (
        <div className="flex justify-center pt-20 items-center bg-transparent text-red-400">
          No data available.
        </div>
      );
    } else {
      return (
        <Table data={filteredData} columns={columns} fetchData={fetchData} />
      );
    }
  };

  const handleAddCategories = () => {
    navigate("/add-categories");
  };

  const smallSpiner = () => {
    return (
      <>
        <div className="w-full h-[250px] flex justify-center items-center mt-2 overflow-auto">
          <div className="border-t-4 border-blue-900 rounded-full animate-spin w-12 h-12"></div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="w-full h-screen bg-blue-50 px-4 ">
        <div className="bg-white mt-3 h-14 rounded-2xl flex justify-between">
          <h1 className="p-3 text-2xl font-bold font-santoshi">Categories</h1>
          <button
            className="bg-blue-900 text-white px-10 m-2  rounded-2xl "
            onClick={handleAddCategories}
          >
            Add Categories
          </button>
        </div>

        <div className=" flex flex-col  b  pt-5">
          <div className="w-full">
            {DropDownList.map((value, key) => {
              return (
                <div key={key} className=" inline-block focus:outline-none ">
                  <button
                    type="button"
                    className={`py-2 font-bold font-santoshi  px-6 ${
                      selectedButton === value
                        ? "text-white  bg-blue-900"
                        : " border-blue-900 border-r-2 bg-white text-blue-900"
                    }`}
                    onClick={() => setSelectedButton(value)}
                  >
                    {value}
                  </button>
                </div>
              );
            })}
          </div>
          {renderComponent()}
        </div>
      </div>
    </>
  );
}

export default CategoriyList;
