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
} from "@/redux/admin/orderSlice";
import { Badge } from "../ui/badge";

const AdminOrderView = () => {
  const [openDetailsDialog, setOpenDetailDialog] = useState(false);
  const { orderList, orderDetails } = useSelector(
    (state) => state.adminOrderSlice
  );
  const dispatch = useDispatch();

  const handleGetOrderDetails = (orderId) => {
    dispatch(getOrderDetailsByAdmin(orderId))
  };

  useEffect(() => {
    dispatch(getAllOrdersByAdmin());
  }, [dispatch]);

  useEffect(() => {
    if(orderDetails!==null) setOpenDetailDialog(true)
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
                        className={`${
                          order?.orderStatus === "pending"
                            ? "bg-gray-500 hover:bg-gray-600"
                            : "bg-green-500 hover:bg-green-600"
                        } rounded-2xl px-3 py-1`}
                      >
                        {order?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${order?.totalAmount}</TableCell>
                    <TableCell className="text-right">
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={setOpenDetailDialog}
                      >
                        <Button
                          onClick={() => handleGetOrderDetails(order._id)}
                        >
                          View Details
                        </Button>
                        <AdminOrderDetailDialog orderDetails={orderDetails} />
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
