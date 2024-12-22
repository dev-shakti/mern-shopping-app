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
import { getAllOrders } from "@/redux/shop/orderSlice";

const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { orderList } = useSelector((state) => state.shoppingOrderSlice);
  const [selectedOrderId,setSelectedOrderId]=useState(null)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders(user?.id))
  }, [dispatch, user?.id]);

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
                    <Button
                      size="sm"
                      className={`${
                        order?.orderStatus === "pending"
                          ? "bg-gray-500 hover:bg-gray-600"
                          : "bg-green-500 hover:bg-green-600"
                      } rounded-2xl px-3 py-1`}
                    >
                      {order?.orderStatus}
                    </Button>
                  </TableCell>
                  <TableCell>${order?.totalAmount}</TableCell>
                  <TableCell className="text-right">
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={setOpenDetailDialog}
                    >
                      <Button onClick={() => {
                        setOpenDetailDialog(true)
                        setSelectedOrderId(order?._id)
                        }}>
                        View Details
                      </Button>
                      <ShoppingOrderDetail orderId={selectedOrderId}/>
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
