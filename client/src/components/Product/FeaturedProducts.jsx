/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

//icons
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";

// Product data

// DiscountBanner component
const DiscountBanner = () => {
  // Dynamic data for categories and discounts
  const [offerEndsIn, setOfferEndsIn] = useState(null);

  const discountInfo = [
    {
      category: "COMPUTER",
      discount: 32,
      productType: "all electronics products",
      ending: "ENDS OF CHRISTMAS",
    },
    {
      category: "SMARTPHONES",
      discount: 20,
      productType: "selected mobile phones",
      ending: "OFFER ENDS IN 5 DAYS",
    },
    {
      category: "LAPTOPS",
      discount: 40,
      productType: "all laptops",
      ending: "ENDS OF SUMMER SALE",
    },
    {
      category: "HEADPHONES",
      discount: 25,
      productType: "audio gear",
      ending: "FLASH SALE ENDS SOON",
    },
  ];

  // Randomly select one of the discount offers
  const randomOffer =
    discountInfo[Math.floor(Math.random() * discountInfo.length)];

  // Function to calculate time left for the offer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const offerEndDate = new Date("2024-12-25T23:59:59");
      const now = new Date();
      const timeLeft = offerEndDate - now;

      if (timeLeft <= 0) {
        setOfferEndsIn(null);
      } else {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);

        setOfferEndsIn({
          days,
          hours,
          minutes,
          seconds,
        });
      }
    };

    // Update the timer every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup the interval on unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-yellow-300 p-8 rounded-lg shadow-lg text-gray-800">
      <h2 className="text-2xl font-bold mb-4">
        {randomOffer.category.toUpperCase()}
      </h2>
      <h1 className="text-5xl font-extrabold text-orange-600 mb-6">
        {randomOffer.discount}% OFF
      </h1>
      <p className="text-lg mb-4">On {randomOffer.productType}</p>
      <div className="flex items-center mb-4">
        <span className="mr-2 font-semibold">Offers ends in:</span>
        <span className="bg-white px-3 py-2 rounded-md text-red-600 font-bold">
          {randomOffer.ending}
        </span>
      </div>
      {offerEndsIn && (
        <div className="flex space-x-4 mb-6">
          <div className="text-center">
            <div className="text-4xl font-bold">{offerEndsIn.days}</div>
            <div className="text-sm">Days</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{offerEndsIn.hours}</div>
            <div className="text-sm">Hours</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{offerEndsIn.minutes}</div>
            <div className="text-sm">Minutes</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{offerEndsIn.seconds}</div>
            <div className="text-sm">Seconds</div>
          </div>
        </div>
      )}
      <ul className="list-disc list-inside text-sm mb-6 font-bold">
        <li>Exclusive offers for premium members.</li>
        <li>Additional 10% off for orders above $500.</li>
        <li>Free shipping on all orders.</li>
      </ul>
      <button className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition duration-300 shadow-lg">
        SHOP NOW →
      </button>
      <div className="mt-6">
        <p className="text-xs text-gray-600">
          * Limited time offer. T&Cs apply. Discounts are subject to
          availability and may change without notice.
        </p>
      </div>
    </div>
  );
};

// ProductCard component
const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  //Navigate to specific product page
  const handleViewProduct = () => {
    navigate(`/product/${product.product_id}`);
  };

  return (
    <div
      key={product.product_id}
      className="bg-white p-4 shadow-lg hover:shadow-2xl border-2 rounded-xl relative"
    >
      {/* product image */}
      <div className="relative group">
        <img
          src={`http://localhost:3000${product.images[0]}`}
          alt={product.name}
          className="w-full h-48 object-contain group-hover:blur-md border-b-2 border-gray-600"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-opacity-50 rounded-lg">
          <div className="flex space-x-4">
            <span className="text-white font-extrabold cursor-pointer bg-orange-400 p-2 rounded-full text-4xl">
              <CiHeart />
            </span>
            <span className="text-white font-extrabold cursor-pointer bg-orange-400 p-2 rounded-full text-4xl">
              <CiShoppingCart />
            </span>
            <span
              onClick={handleViewProduct} 
              className="text-white font-extrabold cursor-pointer bg-orange-400 p-2 rounded-full text-4xl">
              <IoEyeOutline />
            </span>
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="mt-4">
        <h3 className="text-sm font-bold">{product.name}</h3>
        <div className="mt-2 text-xl font-bold text-blue-500">
          ${product.price}
        </div>
      </div>
    </div>
  );
}


const getRandomProducts = (arr, count) => {
  console.log("in here");
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  console.log(`Shuffled ${shuffled}`);
  return shuffled.slice(0, count);
};

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("All Product");

  const ct = useSelector((state) => state.categories.items);
  const product = useSelector((state) => state.products.items);

  //console.log(`Products ${product[0].category_name}`);
  //console.log(product);
  console.log(`Active category ${activeCategory}`);

  const filteredProducts =
    activeCategory === "All Product"
      ? getRandomProducts(product, 6) // Show 6 random products
      : product
        .filter((item) => item.category_name === activeCategory)
        .slice(0, 6);

  console.log(`Active category ${activeCategory}`);
  console.log(`Filtered Product ${filteredProducts}`);

  return (
    <div className="container mx-auto px-20 py-8">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/4 px-4 mb-8">
          <DiscountBanner />
        </div>
        <div className="w-full md:w-3/4 px-4">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveCategory("All Product")}
                className={`${activeCategory === "All Product"
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600"
                  }`}>
                All Product
              </button>
              {ct.map((category) => (
                category.parent_category_id !== null &&
                <button
                  key={category.category_id}
                  onClick={() => setActiveCategory(category.name)}
                  className={`${activeCategory === category.name
                      ? "text-blue-600 font-semibold"
                      : "text-gray-600"
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <button className="text-orange-500 font-semibold cursor-pointer">
              Browse All Product →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))
            ) : (
              <p>No products available in this category</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
