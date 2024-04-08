import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Re-use/Loader";
import "./CreateTypes.css";

function ViewTypes() {
  const [Loading, setLoading] = useState(false);
  const apiURL = process.env.REACT_APP_API_URL;
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the server
    setLoading(true);
    fetch(`${apiURL}/type/types`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setTypes(data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to run only once on component mount

  // Function to handle edit button click
  const handleEditClick = (id) => {
    navigate(`/edit-type/${id}`);
  };

  return (
    <div className="h-screen">
      <h2 className="create-type-heading">Type Table</h2>
      <button
        className="type-button"
        style={{ marginBottom: "10px", marginTop: "10px" }}
        onClick={() => {
          navigate(`/add-type`);
        }}
      >
        Add New Entry
      </button>
      {Loading ? (
        <Loader />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Type Name</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {types.map((type) => (
              <tr key={type._id}>
                <td>{type.typeName}</td>
                <td>
                  <button
                    className="type-button"
                    onClick={() => handleEditClick(type._id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewTypes;
