import { useSelector } from "react-redux";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import CommonForm from "../common/Form";
import { useState } from "react";

const initialFormData = {
    status: "",
  };

const AdminOrderDetailDialog = ({ orderDetails }) => {

   const [formData,setFormData]=useState(initialFormData);

   const handleUpdateStatus = () => {
    
   }
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
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <p className="font-semibold">Order Details</p>
            <ul className="grid gap-3">
              {orderDetails.cartItems && orderDetails.cartItems.length > 0 ? (
                orderDetails.cartItems.map((cartItem) => (
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
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
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
