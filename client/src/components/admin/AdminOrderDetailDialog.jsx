import { useDispatch, useSelector } from "react-redux";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import CommonForm from "../common/Form";
import { useState } from "react";
import {
  getAllOrdersByAdmin,
  getOrderDetailsByAdmin,
  updateOrderStatus,
} from "@/redux/admin/orderSlice";
import { toast } from "sonner";

const initialFormData = {
  status: "",
};

const statusStyles = {
  pending: "bg-yellow-500",
  inProcess: "bg-blue-500",
  inShipping: "bg-purple-500",
  delivered: "bg-green-500",
  rejected: "bg-red-600",
  confirmed:"bg-black"
};
const AdminOrderDetailDialog = ({ orderDetails,setOpenDetailDialog}) => {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();

  const handleUpdateStatus = (e) => {
    e.preventDefault();

    const { status } = formData;

    dispatch(updateOrderStatus({ id: orderDetails?._id, orderStatus: status }))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(getOrderDetailsByAdmin(orderDetails?._id));
          dispatch(getAllOrdersByAdmin()); 
          toast.success(data?.payload?.message);
          setFormData(initialFormData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
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
                      confirmed:"Confirmed"
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
              {orderDetails?.cartItems &&
              orderDetails?.cartItems?.length > 0 ? (
                orderDetails?.cartItems.map((cartItem) => (
                  <li
                    key={cartItem._id}
                    className="flex items-center justify-between"
                  >
                    <p className="text-sm">
                      <strong>Title: </strong>
                      {cartItem.title}
                    </p>
                    <p className="text-sm">
                      <strong>Quantity: </strong>
                      {cartItem.quantity}
                    </p>
                    <p className="text-sm">
                      <strong>Price:</strong> ${cartItem.price}
                    </p>
                  </li>
                ))
              ) : (
                <p className="text-sm text-red-500">No items in the cart.</p>
              )}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <p className="font-semibold">Shipping Info</p>
            <div className="grid gap-0.5">
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

        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                defaultValue: "confirmed", 
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                  { id: "confirmed", label: "Confirmed", disabled: true },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailDialog;
