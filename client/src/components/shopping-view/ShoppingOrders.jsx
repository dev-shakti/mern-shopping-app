import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "../ui/table";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Dialog } from "../ui/dialog";
import ShoppingOrderDetail from "./ShoppingOrderDetail";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getOrderDetails, resetOrderDetails } from "@/redux/shop/orderSlice";
import { Badge } from "../ui/badge";

const statusStyles = {
  pending: "bg-yellow-500",
  inProcess: "bg-blue-500",
  inShipping: "bg-purple-500",
  delivered: "bg-green-500",
  rejected: "bg-red-600",
  confirmed: "bg-black",
};

const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector(
    (state) => state.shoppingOrderSlice
  );

  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }
  useEffect(() => {
    dispatch(getAllOrders(user?.id));
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailDialog(true);
  }, [dispatch, orderDetails]);

  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead className="text-right">
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0 ? (
              orderList.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order?._id}</TableCell>
                  <TableCell>{order?.orderDate.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge
                      className={`py-1 px-3 ${
                        statusStyles[order?.orderStatus] || "bg-black"
                      }`}
                    >
                      {order?.orderStatus
                        ? {
                            pending: "Pending",
                            inProcess: "In Process",
                            inShipping: "In Shipping",
                            delivered: "Delivered",
                            rejected: "Rejected",
                            confirmed: "Confirmed",
                          }[order?.orderStatus]
                        : "Unknown"}
                    </Badge>
                  </TableCell>
                  <TableCell>${order?.totalAmount}</TableCell>
                  <TableCell className="text-right">
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={() => {
                        setOpenDetailDialog(false)
                        dispatch(resetOrderDetails())
                      }}
                    >
                      <Button
                        onClick={() => handleFetchOrderDetails(order?._id)}
                      >
                        View Details
                      </Button>
                      <ShoppingOrderDetail orderDetails={orderDetails} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No Orders Found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;
