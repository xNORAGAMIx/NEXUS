import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSearch,
} from "react-icons/fa";
// Logo
import imgLog from "../../public/imgLog1.png"

// state management methods
import { setCategories, setLoading, setError } from '../redux/products/categoriesSlice';
import { setProducts, setProductsLoading, setProductsError } from '../redux/products/productsSlice';

const Header = () => {
  const dispatch = useDispatch();

  // Categories state 
  const categories = useSelector((state) => state.categories.items);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);

  // Fetching categories
  const getAllCategories = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get('http://localhost:3000/api/v1/category/all');
      if (response.data.valid) {
        dispatch(setCategories(response.data.category));
      } else {
        throw new Error('Failed to fetch categories');
      }
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Fetching products
  const getAllProducts = async () => {
    dispatch(setProductsLoading(true));
    try {
      const response = await axios.get('http://localhost:3000/api/v1/products/all');
      if (response.data.valid) {
        dispatch(setProducts(response.data.products));
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (err) {
      dispatch(setProductsError(err.message));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, []);

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto flex flex-wrap justify-between items-center py-4 px-12">
        {/* Logo */}
        <div className="text-3xl font-bold">
          <Link to="/" className="text-white">
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
            <Link to="/wishlist" className="flex items-center space-x-1 hover:text-gray-300">
              <FaHeart className="text-xl" />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="flex items-center space-x-1 hover:text-gray-300">
              <FaShoppingCart className="text-xl" />
            </Link>

            {/* Profile */}
            <Link to="/auth" className="flex items-center space-x-1 hover:text-gray-300">
              <FaUser className="text-xl" />
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Centered */}
      <div className="bg-white shadow-lg py-4">
        <div className="container mx-auto flex justify-center">
          {loading ? (
            <p className="text-gray-700">Loading...</p>
          ) : error ? (
            <p className="text-gray-700">Error...</p>
          ) : categories && categories.length > 0 ? (
            <ul className="flex space-x-4">
              {categories.map((category) => (
                <li key={category.category_id} className="text-gray-700 hover:text-blue-600 cursor-pointer">
                  {category.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No categories available</p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;