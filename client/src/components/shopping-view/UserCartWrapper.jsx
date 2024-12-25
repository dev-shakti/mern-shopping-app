import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartContent from "./UserCartContent";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const UserCartWrapper = ({ cartItems,setOpenCartSheet }) => {
  const navigate = useNavigate();

  const totalAmount = cartItems
    ?.reduce((acc, currentItem) => {
      const salePrice = Number(currentItem?.productId?.salePrice);
      const quantity = Number(currentItem?.quantity);
      const price = Number(currentItem?.productId?.price);

      // Use salePrice if it's greater than 0; otherwise, fallback to price
      const itemTotal = (salePrice > 0 ? salePrice : price) * quantity;

      return acc + itemTotal;
    }, 0)
    ?.toFixed(2);

  return (
    <SheetContent className="max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-6 space-y-4">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((cartItem) => (
            <UserCartContent cartItem={cartItem} key={cartItem._id} />
          ))
        ) : (
          <span className="font-medium text-lg">No items found</span>
        )}
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalAmount}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout")
          setOpenCartSheet(false)
        }}
        className="w-full bg-orange-300 hover:bg-orange-400 mt-6"
      >
        Proceed To Checkout
      </Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
