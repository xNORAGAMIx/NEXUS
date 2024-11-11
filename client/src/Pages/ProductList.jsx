// // src/components/ProductList.js
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { setProducts, setProductsLoading, setProductsError } from '../redux/products/productsSlice';
// import { setSearchQuery } from '../redux/products/searchSlice';

// const ProductList = () => {
//   const dispatch = useDispatch();

//   const products = useSelector((state) => state.products.productItems); 
//   const searchQuery = useSelector((state) => state.search.query); 
//   const loading = useSelector((state) => state.products.loading); 
//   const error = useSelector((state) => state.products.error); 

//   // Fetch products
//   const fetchProducts = async () => {
//     dispatch(setProductsLoading(true));

//     try {
//       const response = await axios.get('http://localhost:3000/api/v1/products/all'); 
//       if (response.data.valid) {
//         dispatch(setProducts(response.data.products)); 
//         console.log(response.data.products);
//       } else {
//         throw new Error('Failed to fetch products');
//       }
//     } catch (err) {
//       dispatch(setProductsError(err.message)); 
//     } finally {
//       dispatch(setProductsLoading(false));
//     }
//   };

//   // Filter products based on search query
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     product.category_name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   useEffect(() => {
//     fetchProducts(); 
//   }, []); // Empty dependency array means this runs only once after the component mounts

//   const handleSearchChange = (e) => {
//     dispatch(setSearchQuery(e.target.value)); // Update search query in Redux
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={searchQuery}
//         onChange={handleSearchChange}
//         placeholder="Search by name or category"
//       />
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>{error}</p>
//       ) : (
//         filteredProducts.map((product) => (
//           <div key={product.product_id}>
//             <h3>{product.name}</h3>
//             <p>{product.description}</p>
//             <p>Price: ${product.price}</p>
//             <p>Stock: {product.max_stock}</p>
//             <div>
//               <h4>Images:</h4>
//               {product.images.map((image, index) => (
//                 <>
//                 <img key={index} src={`http://localhost:3000${image}`} alt={product.name} style={{ width: 100, marginRight: 10 }} />
//                 </>
//               ))}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ProductList;
