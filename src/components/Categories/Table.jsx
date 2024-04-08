import React, { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FiSearch, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VerifyTable({ data, columns, value, fetchData }) {
  const navigate = useNavigate();
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
  });

  const handleRowClick = (rowData) => {
    navigate(`/edit-categorirs/${rowData}`);
  };

  const [isInputOpen, setIsInputOpen] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState();

  const handleOnClickVerify = (rowData) => {
    setShowVerifyModal(true);
    setSelectedRowData(rowData);
  };

  const handleCloseVerify = () => {
    setShowVerifyModal(false);
  };

  const handlefetchData = () => {
    fetchData();
  };

  const tablelist = () => {
    return (
      <>
        <div className="flex justify-between items-center px-5">
          <h1 className="text-xl text-blue-900 font-santoshi font-semibold">
            {value}
          </h1>
          {!isInputOpen ? (
            <FiSearch
              className="mx-5 text-2xl   cursor-pointer "
              onClick={() => setIsInputOpen(true)}
            />
          ) : (
            <FiX
              className="mx-5 text-2xl  cursor-pointer"
              onClick={() => {
                setIsInputOpen(false);
                setFiltering("");
              }}
            />
          )}
        </div>
        {isInputOpen && (
          <div className="flex items-center px-5 mt-3">
            <input
              type="text"
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
              placeholder="Search..."
              className="border border-gray-300 px-3 py-2 rounded-md flex-1 focus:outline-none"
            />
          </div>
        )}

        <div className="pt-4  px-8 bg-transparent">
          <hr className=" border-gray-500 bg-transparent" />
          <div className="w-full overflow-x-auto mt-3 bg-blue-50">
            <table className="w-full bg-blue-50 mt-3">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-2 font-santoshi text-left "
                        //   onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder ? null : (
                          <div className="flex font-santoshi items-center ">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        )}
                      </th>
                    ))}
                    <th className="px-16 py-2 text-left ">Action</th>
                  </tr>
                ))}
              </thead>

              <tbody className="bg-transparent">
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b font-santoshi hover:bg-white"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`px-4 py-2 bg-transparent ${
                          cell.column.id === "status" &&
                          cell.getValue() === "Active"
                            ? "text-green-600 font-semibold"
                            : cell.getValue() === "Inactive"
                            ? "text-red-600 font-semibold"
                            : ""
                        }`}
                        onClick={() => handleRowClick(row.original._id)}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                    <td className="px-8 py-2 flex bg-transparent gap-3">
                      <span
                        className="bg-blue-900 text-white w-20 cursor-pointer rounded-md text-center"
                        onClick={() => handleRowClick(row.original._id)}
                      >
                        Edit
                      </span>
                      <span
                        className={`${
                          row.original.status === "Active"
                            ? "text-red-600 font-semibold border border-red-400"
                            : "text-green-600 font-semibold border border-green-400"
                        } font-santoshi  w-20 text-center rounded-md cursor-pointer`}
                        onClick={() => handleOnClickVerify(row.original)}
                      >
                        {row.original.status === "Active"
                          ? "InActive"
                          : "Active"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="lg:w-[1070px] h-auto w-full  pb-5  rounded-md bg-white  mt-5">
        <div className=" bg-transparent   pt-5">{tablelist()}</div>
      </div>
      {showVerifyModal && (
        <VerifyModal
          data={selectedRowData}
          onClose={handleCloseVerify}
          handlefetchData={handlefetchData}
        />
      )}
      <ToastContainer />
    </>
  );
}

const VerifyModal = ({ data, onClose, handlefetchData }) => {
  const apiURL = process.env.REACT_APP_API_URL;

  const handleClose = (event) => {
    if (event.target.id === "container") {
      onClose();
    }
  };

  const id = data?._id;

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${apiURL}/category/blockorunblock-category/${id}`
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        handlefetchData();
        onClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.error("Error updating company:", error.message);
    }
  };

  return (
    <div
      id="container"
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50"
      onClick={handleClose}
    >
      <div className="bg-blue-100 w-[700px] p-8  gap-6 rounded-md flex flex-col items-center justify-center ">
        <Icon
          icon="teenyicons:tick-solid"
          className="border border-blue-900 p-3 text-blue-900 rounded-full text-xl font-bold"
        />

        <p className="text-center font-santoshi font-semibold text-gray-600  mt-2">
          Are you sure You want to
          <span
            className={`font-bold px-2 ${
              data?.status === "Active" ? "text-red-600" : "text-green-600"
            }`}
          >
            <br /> {data?.status === "Active" ? "InActive " : "Active"}
          </span>
          {data?.category} Category
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
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
