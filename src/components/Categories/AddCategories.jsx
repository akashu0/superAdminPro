import { Icon } from "@iconify-icon/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddCategories() {
  const navigate = useNavigate();
  const apiURL = process.env.REACT_APP_API_URL;
  const [types, setTypes] = useState([]);

  const [selectedProductType, setSelectedProductType] = useState("");
  const [typeName, setTypeName] = useState();

  const [questions, setQuestions] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [categoryValue, setCategoryValue] = useState("");
  const [subcategories, setSubcategories] = useState([{ id: 1, value: "" }]);

  const handleCategoryChange = (e) => {
    setCategoryValue(e.target.value);
  };

  const handleSubcategoryChange = (id, value) => {
    const updatedSubcategories = subcategories.map((sub) =>
      sub.id === id ? { ...sub, value } : sub
    );
    setSubcategories(updatedSubcategories);
  };

  const handleDelete = (id) => {
    setSubcategories((prevSubcategories) => {
      const updatedSubcategories = prevSubcategories.filter(
        (sub) => sub.id !== id
      );
      return updatedSubcategories;
    });
  };

  const handleAddMore = () => {
    const newId = subcategories.length + 1;
    setSubcategories([...subcategories, { id: newId, value: "" }]);
  };

  useEffect(() => {
    // Fetch data from the server
    // setLoading(true);
    fetch(`${apiURL}/type/types`)
      .then((response) => response.json())
      .then((data) => {
        // setLoading(false);
        // console.log(data);
        setTypes(data);
      })
      .catch((error) => {
        // setLoading(false);
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiURL}/type/types/${selectedProductType}`
        );
        setCurrentIndex(0);
        const data = response.data;
        // console.log(data);
        setQuestions(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    if (selectedProductType) {
      fetchData();
    }
  }, [selectedProductType]);

  const handleCheckboxChange = (stepId, questionId) => {

    setQuestions((prevQuestions) => {
      const updatedSteps = prevQuestions.steps.map((step) => {
        if (step.id === stepId) {
          const updatedQuestions = step.questions.map((question) => {
            if (question.id === questionId) {
              return { ...question, status: !question.status };
            }
            return question;
          });

          return { ...step, questions: updatedQuestions };
        }
        return step;
      });

      return { ...prevQuestions, steps: updatedSteps };
    });
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        typeName: typeName,
        category: categoryValue,
        subcategories: subcategories.map((subcategory) => subcategory.value),
        questions: questions,
      };
      const response = await axios.post(
        `${apiURL}/category/createCategory`,
        formData
      );

      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/categories");
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div
        className={`w-full  bg-blue-50   ${
          selectedProductType ? "h-auto" : "h-screen"
        } `}
      >
        <div className="bg-white p-3 h-14 rounded-2xl ">
          <h1 className="  text-2xl font-bold font-santoshi">Categories</h1>
        </div>

        <h1 className="pt-10 font-bold text-lg font-santoshi p-3">
          Add Category
        </h1>
        <div className="h-auto rounded-xl bg-white w-full p-5">
          <h5 className=" font-santoshi font-bold">Select Type</h5>
          <div className="pt-2 bg-white space-x-14">
            {types.map((type) => (
              <label
                key={type._id}
                className="inline-flex items-center bg-white"
              >
                <input
                  type="radio"
                  className="form-radio  text-blue-500 bg-white cursor-pointer"
                  name="radio-option"
                  value={type.typeName}
                  onClick={() => {
                    setSelectedProductType(type._id);
                    setTypeName(type.typeName);
                  }}
                />
                <span className="ml-2  cursor-pointer">{type.typeName}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col w-1/2 pt-2">
              <label className="font-santoshi font-semibold"> Category</label>
              <input
                className="p-2 h-10 border  border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                type="text"
                value={categoryValue}
                onChange={handleCategoryChange}
              />
            </div>

            <div className="flex flex-col w-1/2 ">
              <label className="font-santoshi font-semibold">
                {" "}
                Sub Category
              </label>
              {subcategories.map((input) => (
                <div key={input.id} className="flex items-center pt-2 gap-5">
                  <input
                    className="w-full p-2 h-10 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    type="text"
                    value={input.value}
                    onChange={(e) =>
                      handleSubcategoryChange(input.id, e.target.value)
                    }
                  />
                  <span
                    className="bg-blue-900 text-white p-2 text-center w-10 rounded-full"
                    onClick={() => handleDelete(input.id)}
                  >
                    <Icon
                      className="cursor-pointer"
                      icon="pepicons-pop:line-x"
                    />
                  </span>
                </div>
              ))}
              <div className="flex justify-end m-4">
                <button
                  onClick={handleAddMore}
                  className="px-10 h-10 font-santoshi font-bold text-blue-900 rounded-lg bg-blue-100"
                >
                  Add More
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-10 rounded-md flex-wrap">
          {questions?.steps?.map((item, index) => (
            <div
              key={index}
              className={`flex-1 md:mx-10 m-3 text-start ${
                index > 0 ? "hidden md:block" : ""
              }`}
            >
              <div
                className={`rounded-full h-2 mb-2 ${
                  index === currentIndex
                    ? "bg-blue-900"
                    : index < currentIndex
                    ? "bg-blue-900"
                    : "bg-gray-400"
                }`}
              ></div>
              <span
                className={`h-2 mb-2 block text-xs font-semibold font-santoshi ${
                  index === currentIndex || index < currentIndex
                    ? "text-blue-900"
                    : "text-gray-600"
                }`}
              >
                STEP {index + 1}
              </span>
              <span
                className={`block text-xs font-semibold font-santoshi  ${
                  index === currentIndex || index < currentIndex
                    ? "text-blue-900"
                    : "text-gray-600"
                }`}
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>

        <div className="flex  flex-wrap h-auto  rounded-xl  p-5 bg-white  m-3">
          {questions &&
            questions?.steps[currentIndex]?.questions.map((question) => (
              <div
                key={question.id}
                className={`pt-5 ${
                  question.type === "text" ? "w-1/2" : "w-full"
                }`}
              >
                <div className="flex items-center   gap-2 ">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    name=""
                    id=""
                    checked={question.status}
                    onChange={() =>
                      handleCheckboxChange(currentIndex + 1, question.id)
                    }
                  />
                  <label className="font-santoshi text-sm  flex flex-col font-semibold">
                    {question.description}
                  </label>
                  {/* <p className="">{question.subDescription}</p> */}
                </div>
                {question.type === "text" ? (
                  <input
                    className="w-4/5 h-9 text-sm p-3 mt-2 focus:outline-none border  border-gray-300 rounded-md focus:border-blue-500"
                    type={question.type}
                    placeholder={question.description}
                  />
                ) : question.type === "textarea" ? (
                  <textarea
                    className="w-full h-32 text-sm p-3 mt-2 focus:outline-none border border-gray-300 rounded-md focus:border-blue-500"
                    rows="1"
                    placeholder={question.description}
                  />
                ) : question.type === "radio" ? (
                  <div className="flex gap-4">
                    {question.options.map((option, index) => (
                      <label key={index} className="flex mx-4 items-center">
                        <input
                          type="radio"
                          className="form-radio text-blue-500  cursor-pointer"
                          name={`radio-${question.id}`}
                          value={option}
                        />
                        <span className="px-3 cursor-pointer">{option}</span>
                      </label>
                    ))}
                  </div>
                ) : question.type === "file" ? (
                  <>
                    <div className="flex flex-wrap">
                      <div className="flex flex-col justify-center border-gray-500 rounded-2xl border-2 border-dashed mt-3 w-32 h-32  items-center mx-2 bg-white">
                        <h6 className="bg-white text-xs m-4 pt-3 text-center font-semibold">
                          Add <br /> Image or video
                        </h6>
                      </div>
                      <div className="flex flex-row  border-gray-500 rounded-2xl border-2 border-dashed mt-3 w-32 h-32  items-center mx-2 bg-white">
                        <h6 className="bg-white text-xs  m-4 pt-3 text-center font-semibold">
                          Add <br /> Image or video
                        </h6>
                      </div>
                      <div className="flex flex-row  border-gray-500 rounded-2xl border-2 border-dashed mt-3 w-32 h-32  items-center mx-2 bg-white">
                        <h6 className="bg-white text-xs  m-4 pt-3 text-center font-semibold">
                          Add <br /> Image or video
                        </h6>
                      </div>
                    </div>
                  </>
                ) : question.type === "select" ? (
                  <select className=" w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                    {question.options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : question.type === "number" ? (
                  <input
                    className=" h-10 border border-gray-300 mt-2 rounded-md focus:outline-none focus:border-blue-500"
                    type="number"
                    placeholder={question.description}
                  />
                ) : question.type === "card" ? (
                  question.cards.map((card, index) => (
                    <div key={index} className="flex gap-4">
                      <input
                        className="p-2 h-10 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        type="text"
                        placeholder={card.description}
                      />
                    </div>
                  ))
                ) : null}
              </div>
            ))}

          <div className="flex justify-start">
            {currentIndex > 0 && (
              <button
                className="w-48 mt-5 h-10 border border-gray-600"
                onClick={() => {
                  setCurrentIndex((prev) => prev - 1);
                }}
              >
                Previous
              </button>
            )}

            {currentIndex < questions?.steps?.length - 1 && (
              <button
                className="w-48 mt-5 text-white  h-10 bg-blue-950 hover:bg-green-500 ml-5"
                onClick={() => {
                  setCurrentIndex((prev) => prev + 1);
                }}
              >
                Next
              </button>
            )}

            {currentIndex === questions?.steps?.length - 1 && (
              <button
                className="w-48 mt-5 text-white h-10 bg-blue-950 hover:bg-green-500 ml-5"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default AddCategories;
