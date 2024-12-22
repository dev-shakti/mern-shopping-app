import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { deleteCartItem, updateCartItem } from "@/redux/shop/cartSlice";
import { toast } from "sonner";

const UserCartContent = ({ cartItem }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  
  const salePrice=Number(cartItem?.productId?.salePrice)
  const quantity = Number(cartItem?.quantity);
  const price = Number(cartItem?.productId?.price);

  const handleUpdateCartItem = (cartItem, typeOfAction) => {
    const updatedQuantity =
      typeOfAction === "plus"
        ? Number(cartItem.quantity) + 1
        : Number(cartItem.quantity) - 1;

    if (updatedQuantity < 1) return;

    dispatch(
      updateCartItem({
        userId: user.id,
        productId: cartItem.productId._id,
        quantity: updatedQuantity,
      })
    )
      .then((data) => {
        if (data?.payload?.success) {
          toast.success(data.payload.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteCartItem = (cartItem) => {
    dispatch(
      deleteCartItem({ userId: user.id, productId: cartItem.productId._id })
    )
      .then((data) => {
        console.log(data);
        if (data?.payload?.success) {
          toast.success(data.payload.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex items-center justify-between">
      {/* left */}
      <div className="flex gap-4">
        <img
          src={cartItem?.productId?.image}
          alt={cartItem?.productId?.title}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold">{cartItem?.productId?.title}</h3>
          <div>
            <Button
              className=""
              variant="outline"
              size="sm"
              onClick={() => handleUpdateCartItem(cartItem, "minus")}
            >
              <Minus className="w-4 h-4" />
              <span className="sr-only">Decrease</span>
            </Button>
            <span className="space-x-2">{cartItem?.quantity}</span>
            <Button
              className=""
              variant="outline"
              size="sm"
              onClick={() => handleUpdateCartItem(cartItem, "plus")}
            >
              <Plus className="w-4 h-4" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
        </div>
      </div>
      {/* right */}
      <div className="flex flex-col gap-2">
         <p className="font-semibold">
            {salePrice>0 ? salePrice*quantity : price*quantity}
         </p>
        <Button
          className=""
          variant="outline"
          size="sm"
          onClick={() => handleDeleteCartItem(cartItem)}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default UserCartContent;
