import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import CompanyList from "../components/Admin/CompanyList"
import ViewTypes from "../components/Types/ViewTypes"
import AddCategories from "../components/Categories/AddCategories"
import CategoriyList from "../components/Categories/CategoriyList"
import CreateTypes from "../components/Types/CreateTypes"
import EditType from "../components/Types/EditType"
import EditCategory from "../components/Categories/EditCategory";
import BuyingTipsPage from "../components/ProductBuyingTips/BuyingTipsPage";


function HomePage() {
  return (
    <>
      <Navbar />
      <div className="mt-16 h-auto   w-full flex bg-blue-50">
        <Sidebar />
        <div className="w-full   mt-7 bg-blue-50  md:ml-60 ">
          <Routes>
            <Route path="/company" element={<CompanyList />}></Route>
            <Route path="/type" element={<ViewTypes />}></Route>
            <Route path="/add-categories" element={<AddCategories />}></Route>
            <Route path="/categories" element={<CategoriyList />}></Route>
            <Route path="/add-type" element={<CreateTypes />}></Route>
            <Route path="/edit-type/:id" element={<EditType />}></Route>
            <Route path="/edit-categorirs/:id" element={<EditCategory />}></Route>
            <Route path="/product-tips" element={<BuyingTipsPage />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default HomePage;
