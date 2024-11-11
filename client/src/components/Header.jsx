import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaChevronDown,
  FaTruck,
  FaHeadset,
  FaExchangeAlt,
  FaQuestionCircle,
} from "react-icons/fa";
//Logo
import imgLog from "../../public/imgLog1.png"

//state management methods
import { setCategories, setLoading, setError } from '../redux/products/categoriesSlice';
import { setProducts, setProductsLoading, setProductsError } from '../redux/products/productsSlice';
//import { setCategoryFilter } from '../redux/products/searchSlice';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  

  //Categories state 
  const categories = useSelector((state) => state.categories.items);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);

  let hideTimeout;
  // Open the dropdown
  const handleMouseEnter = () => {
    clearTimeout(hideTimeout);
    setIsDropdownOpen(true);
  };
  // Close the dropdown with a delay
  const handleMouseLeave = () => {
    hideTimeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 50); // Adjust the delay as needed
  };
  // Fetching categories
  const getAllCategories = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get('http://localhost:3000/api/v1/category/all');
      if (response.data.valid) {
        dispatch(setCategories(response.data.category));
      } else {
        console.log(response.data.category);
        throw new Error('Failed to fetch categories');
      }
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
  // Fetching products
  const getAllProducts = async () => {
    dispatch(setProductsLoading(true));
    try {
      const response = await axios.get('http://localhost:3000/api/v1/products/all');
      if (response.data.valid) {
        dispatch(setProducts(response.data.products));
        console.log(response.data.products);
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (err) {
      dispatch(setProductsError(err.message));
    } finally {
      dispatch(setProductsLoading(false));
    }
  }

  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, [])

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto flex flex-wrap justify-between items-center py-4 px-12">
        {/* Logo */}
        <div className="text-3xl font-bold">
          <Link to="/" className="text-white">
            {/* <img src={imgLog} alt="Logo" className="w-24"/> */}
            NEXUS DROP
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-1/2 mt-2 md:mt-0">
          <input
            type="text"
            placeholder="Search for anything..."
            className="w-full px-10 py-2 rounded-lg text-gray-700 focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-800" />
        </div>

        {/* Contact and Icons */}
        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          <div className="flex space-x-6">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="flex items-center space-x-1 hover:text-gray-300"
            >
              <FaHeart className="text-xl" />
            </Link>

            {/* Cart with Hover */}
            <div
              className="relative"
            >
              <Link
                to="/cart"
                className="flex items-center space-x-1 hover:text-gray-300"
              >
                <FaShoppingCart className="text-xl" />
              </Link>
            </div>

            {/* Profile */}
            <Link
              to="/auth"
              className="flex items-center space-x-1 hover:text-gray-300"
            >
              <FaUser className="text-xl" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white shadow-lg py-2 px-8">
        <div className="container mx-auto flex flex-wrap items-center justify-between space-y-4 md:space-y-0 px-4">
          {/* All Category with Dropdown */}
          
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded-md font-bold flex items-center"
            >
              Category
              <FaChevronDown className={`ml-2 transition-transform duration-300 ease-in-out ${isDropdownOpen ? 'rotate-180' : 'rotate-0'
                }`} />
            </button>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md overflow-hidden z-10 ">
                <ul className="p-2">
                  {loading ? (
                    <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 hover:text-gray-900 cursor-pointer">Loading...</li>
                  ) : error ? (
                    <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 hover:text-gray-900 cursor-pointer">Error...</li>
                  ) : (
                    categories && categories.length > 0 ? (
                      categories.map((category) => (
                        <li key={category.category_id} className="px-4 py-2 text-gray-700 hover:bg-gray-700 hover:text-white cursor-pointer rounded-lg">
                          {category.name}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-gray-500">No categories available</li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Menu Items with Icons */}
          <div className="flex space-x-4 md:space-x-6 text-sm text-gray-700">
            <a
              href="#"
              className="flex items-center space-x-1 hover:text-blue-700"
            >
              <FaTruck />
              <span>Track Order</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-1 hover:text-blue-700"
            >
              <FaExchangeAlt />
              <span>Compare</span>
            </a>
            <Link
              to="/support"
              className="flex items-center space-x-1 hover:text-blue-700"
            >
              <FaHeadset />
              <span>Customer Support</span>
            </Link>
            <Link
              to="/faq"
              className="flex items-center space-x-1 hover:text-blue-700"
            >
              <FaQuestionCircle />
              <span>Need Help?</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Breadcrumb Section */}
      {/* <div className="bg-gray-100 py-3 px-12">
        <div className="container mx-auto">
          <nav className="text-md text-gray-600">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>{" "}
            /
            <Link to="/shop" className="hover:text-blue-600">
              {" "}
              Shop
            </Link>{" "}
            /
            <Link to="/about" className="hover:text-blue-600">
              {" "}
              About Us
            </Link>
            /

            <Link to="/product" className="hover:text-blue-600">
              {" "}
              Product
            </Link>
          </nav>
        </div>
      </div> */}
    </header>
  );
};

export default Header;
