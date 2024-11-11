// src/components/CategoryList.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCategories, setLoading, setError } from '../redux/products/categoriesSlice';
import { setCategoryFilter } from '../redux/products/searchSlice';  // Assuming we use the same searchSlice to filter products

const CategoryList = () => {
  const dispatch = useDispatch();
  
  const categories = useSelector((state) => state.categories.items);  // Categories from Redux store
  const loading = useSelector((state) => state.categories.loading);  // Loading state
  const error = useSelector((state) => state.categories.error);  // Error state

  // Fetch categories
  const fetchCategories = async () => {
    dispatch(setLoading(true));

    try {
      const response = await axios.get('http://localhost:3000/api/v1/category/all'); // Replace with your API URL
      if (response.data.valid) {
        dispatch(setCategories(response.data.category));  // Store categories in Redux
      } else {
        throw new Error('Failed to fetch categories');
      }
    } catch (err) {
      dispatch(setError(err.message));  // Set error message in Redux
    } finally {
      dispatch(setLoading(false));  // Set loading state to false after fetching
    }
  };

  const handleCategoryClick = (categoryId) => {
    dispatch(setCategoryFilter(categoryId));  // Dispatch category filter to Redux (for filtering products)
  };

  useEffect(() => {
    fetchCategories();  // Fetch categories on mount
  }, []);  // Empty dependency array so it runs only once

  return (
    <div>
      <h2>Categories</h2>
      {loading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {categories.map((category) => (
            <button
              key={category.category_id}
              onClick={() => handleCategoryClick(category.category_id)}
              style={{ margin: 5 }}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
