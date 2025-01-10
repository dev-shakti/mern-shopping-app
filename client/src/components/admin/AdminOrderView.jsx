import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Dialog } from "../ui/dialog";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import AdminOrderDetailDialog from "./AdminOrderDetailDialog";
import {
  getAllOrdersByAdmin,
  getOrderDetailsByAdmin,
  resetOrderDetails,
} from "@/redux/admin/orderSlice";
import { Badge } from "../ui/badge";

const statusStyles = {
  pending: "bg-yellow-500",
  inProcess: "bg-blue-500",
  inShipping: "bg-purple-500",
  delivered: "bg-green-500",
  rejected: "bg-red-600",
  confirmed: "bg-black",
};

const AdminOrderView = () => {
  const [openDetailsDialog, setOpenDetailDialog] = useState(false);
  const { orderList, orderDetails } = useSelector(
    (state) => state.adminOrderSlice
  );
  const dispatch = useDispatch();

  const handleGetOrderDetails = (orderId) => {
    dispatch(getOrderDetailsByAdmin(orderId));
  };

  useEffect(() => {
    dispatch(getAllOrdersByAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailDialog(true);
  }, [orderDetails]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
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
                          setOpenDetailDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() => handleGetOrderDetails(order?._id)}
                        >
                          View Details
                        </Button>
                        <AdminOrderDetailDialog
                          orderDetails={orderDetails}
                        />
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
      </CardHeader>
    </Card>
  );
};

export default AdminOrderView;
