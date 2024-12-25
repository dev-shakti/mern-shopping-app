import { getOrderDetails } from "@/redux/shop/orderSlice";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";

const statusStyles = {
  pending: "bg-yellow-500",
  inProcess: "bg-blue-500",
  inShipping: "bg-purple-500",
  delivered: "bg-green-500",
  rejected: "bg-red-600",
  confirmed: "bg-black",
};

const ShoppingOrderDetail = ({ orderId }) => {
  const { orderDetails } = useSelector((state) => state.shoppingOrderSlice);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetails(orderId))
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [dispatch, orderId]);

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-semibold text-sm">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold text-sm">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold text-sm">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold text-sm">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold text-sm">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold text-sm">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  statusStyles[orderDetails?.orderStatus] || "bg-black"
                }`}
              >
                {orderDetails?.orderStatus
                  ? {
                      pending: "Pending",
                      inProcess: "In Process",
                      inShipping: "In Shipping",
                      delivered: "Delivered",
                      rejected: "Rejected",
                      confirmed: "Confirmed",
                    }[orderDetails?.orderStatus]
                  : "Unknown"}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <p className="font-semibold">Order Details</p>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <p className="text-sm">
                  <strong>Title: </strong>
                </p>
                <p className=" text-sm">
                  <strong>Quantity: </strong>Quantity
                </p>
                <p className=" text-sm">
                  <strong>Price:</strong>
                  {orderDetails?.totalAmount}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <p className="font-medium">Shipping Info</p>
            <div className="grid gap-0.5">
              <p className=" text-sm">
                <strong>User Email: </strong>
                {user?.userName[0].toUpperCase()}
              </p>
              <p className=" text-sm">
                <strong>Address: </strong>
                {orderDetails?.addressInfo?.address}
              </p>
              <p className=" text-sm">
                <strong>City: </strong>
                {orderDetails?.addressInfo?.city}
              </p>
              <p className=" text-sm">
                <strong>Pincode: </strong>
                {orderDetails?.addressInfo?.pincode}
              </p>
              <p className=" text-sm">
                <strong>Phone: </strong>
                {orderDetails?.addressInfo?.phone}
              </p>
              <p className=" text-sm">
                <strong>Notes: </strong>
                {orderDetails?.addressInfo?.notes}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default ShoppingOrderDetail;
