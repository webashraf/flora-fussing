import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { removeCartItem, setCart } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TProduct } from "@/types/types";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const CartPage = () => {
  const cartProducts: TProduct[] = useAppSelector((state) => state.cart.cart);
  const dispatch = useAppDispatch();

  const inputValuesRef = useRef<{ [key: string]: string }>({});
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  let newPrice: number = 0;
  cartProducts.forEach((item: TProduct) => {
    newPrice = item.price * item.qty + newPrice;
  });

  const handleAddtocart = (product: TProduct) => {
    const qtyInput = inputValues[product._id] || "1"; // Default to "1" if no input value found
    const updatedQty = Math.min(Number(qtyInput), product.stock);

    const treeCartItem = { ...product, qty: updatedQty };

    dispatch(setCart(treeCartItem));
  };

  const handleRemove = (item: TProduct) => {
    dispatch(removeCartItem(item._id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValues({
      ...inputValues,
      [e.target.dataset.productid!]: value,
    });

    const input = e.target;
    const qty = Number(input.value);
    const productId = input.dataset.productid || "";
    const product = cartProducts.find((item) => item._id === productId);

    if (product) {
      const updatedQty = qty < 1 ? 1 : Math.min(qty, product.stock);

      if (updatedQty === product.stock) {
        input.value = "0";
      } else {
        input.value = String(updatedQty);
      }

      const updateButton = input.nextElementSibling as HTMLButtonElement;
      updateButton.disabled = input.value === "0";
    }
  };

  return (
    <div className="py-20">
      <div className="">
        <h2 className="text-5xl uppercase pb-10">Cart Page</h2>
        {cartProducts?.length !== 0 ? (
          <Table className="flex justify-between flex-wrap max-h-[600px] gap-2">
            {cartProducts?.map((tree: TProduct, i: number) => (
              <TableBody className="w-[48%] bg-[#6984671e]" key={tree._id}>
                <TableRow className="w-full bg-blak">
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell className="uppercase min-w-[150px] bg-bla">
                    <h5 className="text-md font-bold mb-1">{tree.name}</h5>
                  </TableCell>
                  <TableCell className="uppercase w-[0%] bg-b">
                    <p className="text-slate-300 bg-primary text-center rounded-md text-[14px] w-28 mb-1">
                      Price: ${tree.price}
                      <br />
                    </p>
                    <p className="text-slate-300 bg-primary text-center rounded-md text-[14px] w-28">
                      Stock: <span>{tree.stock}</span>
                    </p>
                    <p className="text-slate-300 bg-primary text-center rounded-md text-[14px] w-28">
                      Quantity: <span>{tree.qty}</span>
                    </p>
                    <p className="text-slate-300 bg-primary text-center rounded-md text-[14px] w-28">
                      InputVal: <span>{inputValues[tree._id] || ''}</span>
                    </p>
                  </TableCell>

                  <TableCell className="w-[40%]">
                    <img
                      className="h-[90px] w-[60px] object-cover mx-auto"
                      src={tree.imageURL}
                      alt=""
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-5">
                      <XMarkIcon
                        onClick={() => handleRemove(tree)}
                        className="h-7 w-7 text-red-500 hover:text-red-900"
                      />

                      <input
                        type="number"
                        className="w-[55px] h-[40px] pl-3 text-xl rounded-md border-2 border-slate-400"
                        defaultValue={tree.qty}
                        min={0}
                        onChange={handleInputChange}
                        ref={(el) => {
                          inputValuesRef.current[tree._id] = el?.value || '';
                        }}
                        data-productid={tree._id}
                        value={inputValues[tree._id] || ''}
                      />
                      <Button
                        disabled={
                          tree.stock <= 0 ||
                          Number(inputValues[tree._id] || '0') + tree.qty > tree.stock
                        }
                        onClick={() => handleAddtocart(tree)}
                        className="capitalize"
                      >
                        Update {Number(inputValues[tree._id] || '0') + tree.qty}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        ) : (
          <h3 className="text-3xl text-black">Cart is empty!!</h3>
        )}
      </div>
      <div className="mt-10 flex items-center justify-center gap-5">
        <div className="">
          <h4 className="font-semibold mr-">Total: ${newPrice.toFixed(2)}</h4>
        </div>
        <NavLink to="/checkout">
          <Button type="submit" className="capitalize">
            Proceed to checkout
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default CartPage;
