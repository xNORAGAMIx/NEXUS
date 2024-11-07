import ImageGallery from "../components/ProductDetails/ImageGallery";
import HeroSection from "../components/ProductDetails/HeroSection";
import Description from "../components/ProductDetails/Description";
import FlashDeals from "../components/FlashDeals";

const ProductPage = () => {
  return (
    <>
      <div className="container mx-auto p-8 bg-slate-300 rounded-xl mt-10">
        <div className="flex justify-between items-center space-x-10">
          <ImageGallery />
          <HeroSection />
        </div>
      </div>
      <Description />
      <FlashDeals />
    </>
  );
};

export default ProductPage;
