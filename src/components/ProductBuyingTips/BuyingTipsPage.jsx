import React, { useEffect, useState } from "react";
import "../Re-use/SearchMenu.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import TipsComponents from "./TipsComponents";
function BuyingTipsPage() {
  const DropDownList = ["Published", "Processing", "Rejected"];
  const [selectedButton, setSelectedButton] = useState(DropDownList[0]);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState();

  const apiURL = process.env.REACT_APP_API_URL;

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiURL}/superAdmin/get-alltips`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const smallSpiner = () => {
    return (
      <>
        <div className="w-full h-[250px]  flex justify-center items-center mt-2 overflow-auto">
          <div className="border-t-4 border-blue-900 rounded-full animate-spin w-12 h-12"></div>
        </div>
      </>
    );
  };

  const filteredData = data?.filter((item) => {
    return item.status.toLowerCase() === selectedButton.toLowerCase();
  });

  const renderComponent = () => {
    if (loading) {
      return smallSpiner();
    } else if (data?.length && filteredData?.length === 0) {
      return (
        <div className="flex h-screen justify-center  items-center bg-transparent text-red-400">
          No data available.
        </div>
      ); // Render message when the list is empty
    }

    return <TipsComponents data={filteredData} />;
  };

  return (
    <>
      <div className="mb-20  ">
        <h1 className="text-2xl font-santoshi text-blue-900 font-semibold">
          Business Guide
        </h1>
        <div className=" flex flex-col   pt-5">
          <div className="w-full ">
            {DropDownList.map((value, key) => {
              return (
                <div key={key} className=" inline-block focus:outline-none ">
                  <button
                    type="button"
                    className={`py-2  font-santoshi font-semibold text-sm  px-10 ${
                      selectedButton === value
                        ? "text-blue-900  border-b-2 border-b-blue-900"
                        : "   text-gray-700"
                    }`}
                    onClick={() => setSelectedButton(value)}
                  >
                    {value}
                  </button>
                </div>
              );
            })}
            <div className="border w-1/2 ml-2 "></div>
            {/* <hr className="w-1/2 ml-5 text-red-500" /> */}
          </div>
          {/* <SearchMenu /> */}

          {renderComponent()}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default BuyingTipsPage;
