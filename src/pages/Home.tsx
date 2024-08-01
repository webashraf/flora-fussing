/* eslint-disable @typescript-eslint/no-explicit-any */
import { SkeletonCard } from "@/components/customUi/SkeletonLoading/SkeletonLoading";
import Products from "@/components/Home/AllProducts/Products";
import Gallery from "@/components/Home/Gallery/Gallery";
import Hero from "@/components/Home/Hero/Hero";
import ProductList from "@/components/Home/ProductList/ProductList";
import ProductsCategory from "@/components/Home/ProductsCategory/ProductsCategory";
import ProductsDetails from "@/components/Home/ProductsDetails/ProductsDetails";
import SlideAdds from "@/components/Home/SlideAdds/SlideAdds";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "@/redux/api/baseApi";
import Loader from "@/shared/Loader/loader/Loader";

const Home = () => {
  // Fetch products data
  const { data: products, isLoading } = useGetProductsQuery({});

  // Fetch categories data
  const { data: categories } = useGetCategoriesQuery({});

  // Display a loader if products data is not yet available
  if (isLoading) {
    return (
      <div className="my-36 ">
        <Loader />
      </div>
    );
  }


  // Display a loader if categories data is not yet available
  if (!categories) {
    return (
      <div>
        <Loader />;
        <div>
          <h1 className="">20% Discount of every fruit trees</h1>
        </div>
      </div>
    );
  }

  // console.log("products", products);

  return (
    <div data-scroll-section>
      <Hero products={products?.result} />
      <Products />
      <ProductsCategory categories={categories?.result} />
      <ProductList products={products?.result} />
      <SlideAdds />
      <ProductsDetails products={products?.result} />
      <Gallery products={products?.result} />
    </div>
  );
};

export default Home;
