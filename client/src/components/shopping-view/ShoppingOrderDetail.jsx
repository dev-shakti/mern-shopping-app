import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const ShoppingOrderDetail = () => {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-semibold text-sm">Order ID</p>
            <Label>753292433492</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold text-sm">Order Date</p>
            <Label>23.09.24</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold text-sm">Order Price</p>
            <Label>$3490</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold text-sm">Payment method</p>
            <Label>Paid</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold text-sm">Payment Status</p>
            <Label>Confirmed</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold text-sm">Order Status</p>
            <Label>
              {/* <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                Pending
              </Badge> */}
              Pending
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
                  <strong>Title: </strong>Title
                </p>
                <p className=" text-sm">
                  <strong>Quantity: </strong>Quantity
                </p>
                <p className=" text-sm">
                  <strong>Price:</strong>Price
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
                <strong>Username: </strong>John Doe
              </p>
              <p className=" text-sm">
                <strong>Address: </strong>Mumbai, Maharastra
              </p>
              <p className=" text-sm">
                <strong>City: </strong>Mumbai
              </p>
              <p className=" text-sm">
                <strong>Pincode: </strong>878456
              </p>
              <p className=" text-sm">
                <strong>Phone: </strong>9145678923
              </p>
              <p className=" text-sm">
                <strong>Notes: </strong>lorem ipsum
              </p>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default ShoppingOrderDetail;
