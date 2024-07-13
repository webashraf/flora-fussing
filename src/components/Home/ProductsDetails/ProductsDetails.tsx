import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TProduct } from "@/types/types";
import { NavLink } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductsDetails = ({ products }: { products: TProduct | any }) => {
  // Function to get a random product from the list
  const getRandomProduct = (number: number = 10) => {
    return products[Math.floor(Math.random() * number) + 1];
  };

  const currentProduct = getRandomProduct();

  return (
    <div className="section-margin-top">
      <div className="flex gap-5 items-center">
        <div className="w-1/3 relative">
          <img
            className="w-full h-[600px] object-cover"
            src={currentProduct?.imageURL}
            alt=""
          />
          <h2 className="text-4xl font-bold backdrop-blur-lg w-full text-center py-5 text-white absolute bottom-0 z-40">
            {currentProduct?.name}
          </h2>
        </div>

        {/* Display the list of products in a table */}
        <div className="h-[600px] overflow-y-scroll w-2/3 ml-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Serial</TableHead>
                <TableHead>Name & Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Total Items</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            {/* Map through the products and display each one in a table row */}
            {products?.map((product: TProduct, i: number) => (
              <TableBody key={product._id}>
                <TableRow>
                  <TableCell className="font-medium">{i}</TableCell>
                  <TableCell className="uppercase">
                    <h5 className="text-md font-bold mb-1">{product.name}</h5>
                    <p className="text-slate-300 bg-primary text-center rounded-md text-[11px] py-[px] w-24">
                      {product.category.name}
                    </p>
                  </TableCell>
                  <TableCell className="uppercase">
                    {product.shortDescription}
                  </TableCell>
                  <TableCell
                    className={product.stock === 0 ? "text-red-500" : ""}
                  >
                    {product.stock}
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell className="text-right">
                    {/* Button to view single product details */}
                    <NavLink to={`/single-product/${product._id}`}>
                      <Button className="">View Items</Button>
                    </NavLink>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
