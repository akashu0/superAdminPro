import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

function HomePage() {
  return (
    <>
      <Navbar />
      <div className="mt-16 flex bg-blue-50 ">
        <div className="">
          <Sidebar />
        </div>
        <div className="w-full h-screen md:ml-64 lg:ml-0">
          <Routes>
            {/* <Route path="/" element={<LandingPage />}></Route>
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/opportunities" element={<Opportunities />}></Route>
            <Route path="/enquiries" element={<AdminEnquiries />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/dashboard" element={<Analytics />} />
            <Route path="/access" element={<AccessPage />} />
            <Route path="/faqs" element={<FaqsPage />} />
            <Route path="/setting" element={<SettingPage />} />
            <Route path="/profile" element={<ProfilePage />}></Route> */}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default HomePage;
