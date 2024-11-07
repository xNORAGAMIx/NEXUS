import xbox from "../assets/xbox.png";

const categories = [
  {
    title: "FLASH SALE TODAY",
    products: [
      {
        name: "Bose Sport Earbuds -Wireless Earphones -Bluetooth In Ear...",
        price: "$1,500",
        image: xbox,
      },
      {
        name: "Simple Mobile 4G LTE Prepaid Smartphone",
        price: "$1,500",
        image: xbox,
      },
      {
        name: "4K UHD LED Smart TV with Chromecast Built-in",
        price: "$1,500",
        image: xbox,
      },
    ],
  },
  {
    title: "BEST SELLERS",
    products: [
      {
        name: "Samsung Electronics Samsung Galaxy S21 5G",
        price: "$1,500",
        image: xbox,
      },
      {
        name: "Simple Mobile 5G LTE Galaxy 12 Mini 512GB Gaming Phone",
        price: "$1,500",
        image: xbox,
      },
      {
        name: "Sony DSCHX8 High Zoom Point & Shoot Camera",
        price: "$1,500",
        image: xbox,
      },
    ],
  },
  {
    title: "TOP RATED",
    products: [
      {
        name: "Portable Wshing Machine, 11lbs capacity Model 18NMF...",
        price: "$1,500",
        image: xbox,
      },
      {
        name: "Sony DSCHX8 High Zoom Point & Shoot Camera",
        price: "$1,500",
        image: xbox,
      },
      {
        name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
        price: "$1,500",
        image: xbox,
      },
    ],
  },
  {
    title: "NEW ARRIVAL",
    products: [
      {
        name: "TOZO T6 True Wireless Earbuds Bluetooth Headpho...",
        price: "$1,500",
        image: xbox,
      },
      {
        name: "JBL FLIP 4 -Waterproof Portable Bluetooth Speaker...",
        price: "$1,500",
        image: xbox,
      },
      {
        name: "Wyze Cam Pan v2 1080p Pan/ Tilt/Zoom Wi-Fi Indoor Smar...",
        price: "$1,500",
        image: xbox,
      },
    ],
  },
];

export default function FlashDeals() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-lg font-bold text-gray-600">
              {category.title}
            </h2>
            <div className="space-y-4">
              {category.products.map((product, productIndex) => (
                <div
                  key={productIndex}
                  className="flex p-4 shadow-2xl rounded-2xl items-center h-24 w-full cursor-pointer  border-4 border-slate-500"
                >
                  <div className="flex-shrink-0 w-16 h-16 mr-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-[50px] h-[50px] object-contain "
                    />
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <p className="text-sm truncate">{product.name}</p>
                    <p className="text-blue-500 font-bold">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
