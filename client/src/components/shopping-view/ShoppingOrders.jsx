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
import { useState } from "react";
import { Dialog } from "../ui/dialog";
import ShoppingOrderDetail from "./ShoppingOrderDetail";

const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailDialog] = useState(false);
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
            <TableRow>
              <TableCell>783627323</TableCell>
              <TableCell>21.09.2024</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>$320</TableCell>
              <TableCell className="text-right">
                <Dialog
                  open={openDetailsDialog}
                  onOpenChange={setOpenDetailDialog}
                >
                  <Button onClick={() => setOpenDetailDialog(true)}>
                    View Details
                  </Button>
                  <ShoppingOrderDetail/>
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;
