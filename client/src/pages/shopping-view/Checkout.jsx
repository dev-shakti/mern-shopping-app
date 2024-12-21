import Address from "@/components/shopping-view/Address";
import UserCartContent from "@/components/shopping-view/UserCartContent";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSelector } from "react-redux";

const ShoppingCheckout = () => {
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const { cartItems } = useSelector((state) => state.shoppingCart);

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items
          .reduce((acc, currentItem) => {
            return (
              acc +
              Number(currentItem?.productId?.price || 0) *
                Number(currentItem?.quantity || 0)
            );
          }, 0)
          ?.toFixed(2)
      : null;

  const handleInitiatePaypalPayment = () => {};

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src="https://media.istockphoto.com/id/1447860506/photo/portrait-of-happy-indian-family-wearing-casual-cloths-holding-shopping-bags-and-celebration.webp?a=1&b=1&s=612x612&w=0&k=20&c=Y44d12OG8zXCe1n-r7NdEO0XcAFpwPBafyCYu6uxbbQ="
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5 px-4 md:px-6">
        <Address />

        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartContent cartItem={item} key={item._id} />
              ))
            : null}

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {isPaymentStart
                ? "Processing Paypal Payment..."
                : "Checkout with Paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
