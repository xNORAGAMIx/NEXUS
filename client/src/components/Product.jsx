import  { useEffect, useState } from "react";
import Card from "/src/components/Card";
import Spinner from "/src/components/Spinner";

const Product = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const API = "https://fakestoreapi.com/products";
  

  const categories = [
    "Electronics Devices", "Computer & Laptop", "Computer Accessories", "SmartPhone",
    "Headphone", "Mobile Accessories", "Gaming Console", "Camera & Photo",
    "TV & Home Appliances", "Watch & Accessories", "GPS & Navigation", "Wearable Technology"
  ];
  
  const priceRanges = [
    "All Price", "Under $20", "$25 to $100", "$100 to $300",
    "$300 to $500", "$500 to $1,000", "$1,000 to $10,000"
  ];
  
  const popularBrands = [
    "Apple", "Microsoft", "Dell", "Symphony", "Sony", "LG",
    "Google", "Samsung", "HP", "Xiaomi", "Panasonic", "Intel"
  ];

  async function fetchProductData() {
    setLoading(true);

    try {
      const res = await fetch(API);
      const data = await res.json();
      setPosts(data);
      console.log("data", data); // Updated to log 'data' instead of 'posts'
    } catch (error) {
      console.log("Error occurred");
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  return loading ? (
    <div className="flex justify-center items-center">
        <Spinner/>
    </div>
     ) :(
    <div className="w-full flex">
      <div className="w-1/4 p-4 border-r ">
        <div className="mb-6">
          <h2 className="font-bold mb-2">CATEGORY</h2>
          {categories.map((category, index) => (
            <div key={index} className="flex items-center mb-1">
              <input type="checkbox" className="mr-2" />
              <span>{category}</span>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="font-bold mb-2">PRICE RANGE</h2>
          <div className="flex justify-between mb-2">
            <span>Min price</span>
            <span>Max price</span>
          </div>
          {priceRanges.map((range, index) => (
            <div key={index} className="flex items-center mb-1">
              <input type="checkbox" className="mr-2" />
              <span>{range}</span>
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-bold mb-2">POPULAR BRANDS</h2>
          <div className="grid grid-cols-2 gap-2">
            {popularBrands.map((brand, index) => (
              <div key={index} className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div className="flex items-center flex-col w-3/4 ">
        <div className="w-full flex justify-between items-center space-x-4">
          <div>
            <input placeholder="Search for everything" className="border px-2 py-1 " />
          </div>

         

          <div className="flex justify-center items-center space-x-2 ">
          <div>
            <p>Sort By:</p>
          </div>
          <div>
          <select className="">
              <option>Most Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
           
          </div>
        </div>

        {
        posts.length > 0 ? (
          
          <div className="grid grid-cols-4 gap-4 mt-3">
            {
               posts.map((post) => (
               <Card key={post.id} post={post} />
            ))
            }
          </div>
          ) : (
          <div className="flex justify-center items-center">
            <p>No Posts found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
