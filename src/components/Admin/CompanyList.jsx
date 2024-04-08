import React, { useEffect, useMemo, useState } from "react";
import PendingTable from "../Re-use/PendingTable";
import VerifyTable from "../Re-use/VerifyTable";
import RejectedTable from "../Re-use/RejectedTable";
import axios from "axios";

function CompanyList() {
  const DropDownList = [
    "Verified entities",
    "Pending entities",
    "Rejected entities",
  ];
  const [selectedButton, setSelectedButton] = useState(DropDownList[0]);

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const data = useMemo(() => {
    switch (selectedButton) {
      case "Verified entities":
        return list
          .filter((item) => item.status === "verified")
          .map((item) => ({
            ...item,
            createdAt: new Date(item.createdAt).toLocaleDateString(),
            updatedAt: new Date(item.updatedAt).toLocaleDateString(),
          }));
      case "Pending entities":
        return list
          .filter((item) => item.status === "pending")
          .map((item) => ({
            ...item,
            createdAt: new Date(item.createdAt).toLocaleDateString(),
          }));
      case "Rejected entities":
        return list
          .filter((item) => item.status === "rejected")
          .map((item) => ({
            ...item,
            createdAt: new Date(item.createdAt).toLocaleDateString(),
            updatedAt: new Date(item.updatedAt).toLocaleDateString(),
          }));
      default:
        return [];
    }
  }, [list, selectedButton]);

  const columns = [
    {
      header: "Company Name",
      accessorKey: "companyName",
    },
    {
      header: "Email",
      accessorKey: "companyEmail",
    },
    {
      header: "Address",
      accessorKey: "state",
    },
    {
      header: "Appled Date",
      accessorKey: "createdAt",
    },
    {
      header: "Verified Date",
      accessorKey: "updatedAt",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
  ];
  const apiURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL}/admin/get-all-company`);

        console.log(response.data), "data...........";
        setList(response.data);
        setLoading(false);
      } catch (error) {}
    };

    fetchData();
  }, []);

  let modifiedColumns = [...columns];
  if (selectedButton === "Pending entities") {
    // If the selected button is "Pending entities", remove the column for "verifiedDate"
    modifiedColumns = modifiedColumns.filter(
      (column) => column.accessorKey !== "updatedAt"
    );
  }

  const renderComponent = () => {
    if (loading) {
      return smallSpiner();
    } else if (data?.length === 0) {
      return (
        <div className="flex justify-center pt-20 items-center bg-transparent text-red-400">
          No data available.
        </div>
      ); // Render message when list is empty
    } else {
      switch (selectedButton) {
        case "Verified entities":
          return (
            <VerifyTable
              data={data.map((item) => ({
                ...item,
                createdAt: new Date(item.createdAt).toLocaleDateString(),
                updatedAt: new Date(item.updatedAt).toLocaleDateString(),
              }))}
              columns={columns}
              value={selectedButton}
            />
          );
        case "Pending entities":
          return (
            <PendingTable
            data={data.map((item) => ({
              ...item,
              createdAt: new Date(item.createdAt).toLocaleDateString(),
              updatedAt: new Date(item.updatedAt).toLocaleDateString(),
            }))}
              columns={modifiedColumns}
              value={selectedButton}
            />
          );
        case "Rejected entities":
          return (
            <RejectedTable
              data={data}
              columns={columns}
              value={selectedButton}
            />
          );
        default:
          return null;
      }
    }
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
      <div className="w-full h-screen bg-blue-50 px-4">
        <h1 className="text-2xl font-santoshi   text-blue-900 font-bold">
          Company profiles
        </h1>
        <div className="pt-1 md:w-[800px] bg-blue-50">
          <hr className="border border-gray-400" />
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

export default CompanyList;
