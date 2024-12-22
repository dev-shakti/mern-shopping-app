import Address from "@/components/shopping-view/Address";
import UserCartContent from "@/components/shopping-view/UserCartContent";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/redux/shop/orderSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const ShoppingCheckout = () => {
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shoppingOrderSlice);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);

  const dispatch = useDispatch();

  const totalCartAmount =
  cartItems && cartItems.items && cartItems.items.length > 0
    ? cartItems.items
        .reduce((acc, currentItem) => {
          // Extract salePrice, price, and quantity
          const salePrice = Number(currentItem?.productId?.salePrice);
          const price = Number(currentItem?.productId?.price);
          const quantity = Number(currentItem?.quantity);

          // Use salePrice if it's greater than 0; otherwise, fallback to price
          const itemTotal = (salePrice > 0 ? salePrice : price) * quantity;

          // Accumulate the total
          return acc + itemTotal;
        }, 0)
        ?.toFixed(2)
    : null;

  const handleInitiatePaypalPayment = () => {
    if (currentSelectedAddress === null) {
      toast.error("Must select one address to proceed for payment");
      return;
    }

    const orderData = {
      userId: user?.id,
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.productId?.title,
        image: item?.productId?.image,
        price:
          Number(item?.productId?.salePrice) > 0
            ? Number(item?.productId?.salePrice)
            : Number(item?.productId?.price),
        quantity: Number(item?.quantity),
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        phone: currentSelectedAddress?.phone,
        pincode: currentSelectedAddress?.pincode,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: Number(totalCartAmount),
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
      cartId: cartItems?._id,
    };
   
    dispatch(createNewOrder(orderData))
      .then((data) => {
        console.log(data, "hello");
         if(data?.payload?.success){
          setIsPaymentStart(true)
         }else{
          setIsPaymentStart(false)
         }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src="https://media.istockphoto.com/id/1447860506/photo/portrait-of-happy-indian-family-wearing-casual-cloths-holding-shopping-bags-and-celebration.webp?a=1&b=1&s=612x612&w=0&k=20&c=Y44d12OG8zXCe1n-r7NdEO0XcAFpwPBafyCYu6uxbbQ="
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5 px-4 md:px-6">
        <Address
          currentSelectedAddress={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />

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
