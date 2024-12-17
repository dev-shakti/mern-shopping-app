import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartContent from "./UserCartContent";
import { Button } from "../ui/button";

const UserCartWrapper = ({ cartItems }) => {
  const totalAmount = cartItems
    ?.reduce((acc, currentItem) => {
      return (
        acc +
        Number(currentItem?.productId?.price || 0) *
          Number(currentItem?.quantity || 0)
      );
    }, 0)
    ?.toFixed(2);

  return (
    <SheetContent className="sm:max-w-md">
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
      <Button className="w-full bg-orange-300 hover:bg-orange-400 mt-6">
        Proceed To Checkout
      </Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
