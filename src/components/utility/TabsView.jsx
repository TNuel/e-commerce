import { useState, useEffect } from "react";
import axios from "axios";

const TabsView = ({ getProductsByCategory }) => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("All Categories");

  useEffect(() => {
    getAllCategories();
    updateScreenSize();

    const handleResize = () => {
      updateScreenSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getAllCategories = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://fakestoreapi.com/products/categories`
      );
      console.log("product response =>", res);
      setIsLoading(false);
      const result = res.data;
      setCategories(["All Categories", ...result]);
    } catch (error) {
      console.log("product error =>", error);
      setIsLoading(false);
      throw error;
    }
  };

  const updateScreenSize = () => {
    setIsMobile(window.innerWidth <= 640);
  };
  // eslint-disable-next-line no-unused-vars
  const changeCategory = (event) => {
    const currentCategory = event.target.value;
    console.log("get here for current category =>", currentCategory);
    setActiveTab(currentCategory);
    getProductsByCategory(currentCategory);
  };
  // eslint-disable-next-line no-unused-vars
  const changeTab = (index, currentCategory) => {
    console.log("get here for current category =>", currentCategory);
    setActiveTab(currentCategory);
    getProductsByCategory(currentCategory);
  };

  return (
    <div className="lg:flex justify-between items-center lg:space-x-4">
      {/* Tabs for larger screens */}
      <div
        className={`flex w-full justify-between items-center space-x-4 ${
          !isMobile ? "" : "hidden"
        }`}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => changeTab(index, category)}
            className={`cursor-pointer px-4 hover:px-6 py-2 hover:text-white capitalize hover:bg-textPrimary rounded-lg transition duration-300 text-sm text-left lg:text-base font-semibold inline-flex tracking-tight text-textSecondary leading-none ${
              activeTab === category ? "bg-secondary text-white" : ""
            }`}
          >
            {category}
          </div>
        ))}
      </div>

      {/* Dropdown select for mobile screens */}
      <div className={`${isMobile ? "" : "hidden"}`}>
        <select
          onChange={changeCategory}
          value={activeTab}
          className="block w-full p-3 text-lg text-left border-2 border-textSecondary rounded-md capitalize font-semibold bg-white tracking-tight text-textSecondary leading-none"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TabsView;
