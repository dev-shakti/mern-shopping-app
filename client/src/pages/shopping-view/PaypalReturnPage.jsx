import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/redux/shop/orderSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const PaypalReturnPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (payerId && paymentId) {
      const orderId =JSON.parse(sessionStorage.getItem("currentOrderId"));

      dispatch(capturePayment({ payerId, paymentId, orderId }))
        .then((data) => {
          if (data?.payload?.success) {
            sessionStorage.removeItem("currentOrderId");
            window.location.href="/shop/payment-success"
          }
        })
        .catch((err) => console.log(err));
    }
  }, [payerId, paymentId, dispatch]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing...Please wait</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PaypalReturnPage;
