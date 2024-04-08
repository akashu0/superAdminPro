import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import { LiaClipboardCheckSolid } from "react-icons/lia";
import { CiSettings } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoCubeOutline } from "react-icons/io5";
import { GrAnalytics } from "react-icons/gr";
import { FaRegLightbulb, FaRegQuestionCircle } from "react-icons/fa";
// import sidBarImage from "../../assets/sidebar.png";
import { CgBox } from "react-icons/cg";
import { LuKey } from "react-icons/lu";
import { TbCategoryPlus } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
// import { useDispatch, useSelector } from "react-redux";
// import { clearToken } from "../../store/tokenSlice";
// import axios from "axios";

function Navbar() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const user = useSelector((state) => state.token.user);
  // const token = useSelector((state) => state.token.token);
  // const userType = useSelector((state) => state.token.role);

  // const [userDetaisl, setUserDetails] = useState();

  // const submitLogout = () => {
  //   dispatch(clearToken());
  //   navigate("/");
  // };
  // const apiURL = process.env.REACT_APP_API_URL;

  const [navLinks, setNavLinks] = useState([
    {
      title: "Dashboard",
      icon: <Icon icon="mingcute:grid-2-fill" className="bg-transparent" />,
      path: "/admin",
    },
    {
      title: "Company Profiles",
      icon: <CgBox className="bg-transparent" />,
      path: "/company",
    },
    {
      title: "Categories",
      icon: <TbCategoryPlus className="bg-transparent" />,
      path: "/categories",
    },
    {
      title: "Products",
      icon: <IoCubeOutline className="bg-transparent" />,
      path: "/admin/products",
    },
    {
      title: "Opportunities",
      icon: <FaRegLightbulb className="bg-transparent" />,
      path: "/admin/opportunities",
    },
    {
      title: "Enquiries",
      icon: <FaPeopleGroup className="bg-transparent" />,
      path: "/admin/enquiries",
    },
    {
      title: "Wishlist",
      icon: <LiaClipboardCheckSolid className="bg-transparent" />,
      path: "/admin/wishlist",
    },
    {
      title: "Analytics",
      icon: <GrAnalytics className="bg-transparent" />,
      path: "/admin/dashboard",
    },
    {
      title: "Access Management",
      icon: <LuKey className="bg-transparent" />,
      path: "/admin/access",
    },
    {
      title: "Faqs",
      icon: <FaRegQuestionCircle className="bg-transparent" />,
      path: "/admin/faqs",
    },
    {
      title: "Setting",
      icon: <CiSettings className="bg-transparent" />,
      path: "/admin/setting",
    },
    {
      title: "Logout",
      icon: <IoMdLogOut className="bg-transparent" />,
      path: "/admin/setting",
    },
  ]);

  const Menus = [
    {
      name: "Home",
      icon: "iconamoon:notification-light",
      path: "/forum",
    },
    // { name: "notification", icon: "jam:message-alt", path: "/forum" },
    {
      name: "profile",
      icon: "bx:user",
      path: "/profile",
    },
  ];
  const profileMenu = {
    name: "userName",
    icon: "ep:arrow-down",
    path: "/profile",
  };
  const [Open, setOpen] = useState(false);
  const handleMenu = () => {
    setOpen((prev) => !prev);
    console.log(Open);
  };
  return (
    <>
      <nav className="w-full h-16  fixed flex gap-6 bg-blue-900   top-0 left-0">
        <div className="text-white px-10 bg-blue-900 cursor-pointer flex  py-4 font-serif">
          {/* <Link to={userType === "admin" ? "/admin" : "/"}> */}
          <h1 className="text-white  bg-blue-900 cursor-pointer  font-semibold text-3xl  font-serif">
            Prolio
          </h1>
          {/* </Link> */}
          <span className="text-white text-lg font-santoshi hidden md:block bg-blue-900 px-6 py-1">
            {" "}
            Categories
          </span>
        </div>

        <div className=" w-1/2  bg-blue-900 items-center pt-4 mx-16 relative  hidden md:block">
          <input
            type="text"
            className="bg-blue-900 px-10 rounded-lg text-lg text-white  border-gray-500 border w-4/5  h-10 focus:outline-none"
            placeholder="Search"
          />
          <svg
            className="h-5 w-6 bg-blue-900 absolute top-7 mx-3 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M20 20l-4.579-4.579M8 15a7 7 0 100-14 7 7 0 000 14z"></path>
          </svg>
        </div>
        <div className="flex justify-end  md:w-60 px-3 md:mx-4 items-center gap-3 ">
          <div className="w-9 h-9  rounded-full bg-blue-50 flex items-center justify-center cursor-pointer">
            <Icon
              icon="iconamoon:notification-light"
              className="text-blue-900 text-3xl"
            />
          </div>

          <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center cursor-pointer">
            <Icon className="text-blue-900 text-3xl" icon="bx:user" />
          </div>
          <div className=" md:hidden">
            {Open ? ( // Render the hamburger icon button when the menu is closed
              <button className="text-white p-4" onClick={handleMenu}>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            ) : (
              <button className="text-white p-4" onClick={handleMenu}>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Profile Dropdown */}
        {/* <ProfileDropdown profileMenu={profileMenu} /> */}

        {Open ? (
          <>
            {/* <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-30 backdrop-blur-sm z-20"></div> */}
            <div className="md:hidden absolute left-0 w-full shadow-lg mt-16 z-30 bg-blue-900 backdrop-filter backdrop-blur-lg">
              <div className="px-2 hover:bg-blue-900 hover:text-white text-black gap-1">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    onClick={() => {
                      setOpen(false); // Close the menu when a link is clicked
                    }}
                    className="py-2 px-4 hover:bg-blue-800 text-white text-base block"
                  >
                    <div className="flex  items-center">
                      {link.icon}
                      <span className="ml-2 font-santoshi">{link.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </nav>
    </>
  );
}

export default Navbar;

const ProfileDropdown = ({ profileMenu, submitLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="relative ml-3 bg-transparent pt-2 hidden md:block">
      <button
        onClick={handleDropdownToggle}
        className="w-14 h-9 rounded-full bg-transparent flex justify-center items-center"
      >
        <span className="text-sm text-white bg-transparent px-3 whitespace-nowrap ">
          {profileMenu.name}
        </span>
        <Icon
          className="text-white bg-transparent  text-xl"
          icon={profileMenu.icon}
        />
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-3 w-36 h-32 text-center bg-white  rounded-lg shadow-lg overflow-hidden">
          <ul className="bg-transparent">
            <li className="px-4 border-b border-blue-900 bg-transparent hover:bg-blue-50 py-5">
              Profile
            </li>

            <li
              className="px-4 py-2 hover:bg-blue-50 bg-transparent"
              // onClick={submitLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
