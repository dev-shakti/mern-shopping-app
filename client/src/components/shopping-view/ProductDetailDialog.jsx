import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {} from "@radix-ui/react-avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import StarRating from "../common/StarRating";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductReview,
  getProductReviews,
} from "@/redux/shop/productReviewSlice";
import { toast } from "sonner";
import { resetProductDetails } from "@/redux/shop/productSlice";


const ProductDetailDialog = ({ open, setOpen, productDetails,handleAddToCart}) => {
  const [reviewMessage, setReviewMessage] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const { reviews } = useSelector((state) => state.productReview);
  const dispatch = useDispatch();

  const price=Number(productDetails?.price)
  const salePrice=Number(productDetails?.salePrice)
 
  const addReview = () => {
    dispatch(
      addProductReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMessage,
        reviewValue: rating,
      })
    )
      .then((data) => {
        if (data?.payload?.success) {
          setRating(0);
          setReviewMessage("");
          dispatch(getProductReviews(productDetails?._id));
          toast.success(data?.payload?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRatingChange = (getRating) => {
    setRating(getRating);
  };

  const handleDialogClose = () => {
    setRating(0);
    dispatch(resetProductDetails())
    setReviewMessage("");
    setOpen(false);
  };

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getProductReviews(productDetails?._id));
    }
  }, [dispatch, productDetails]);

  const averageReview =
  reviews && reviews.length > 0
    ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      reviews.length
    : 0;


  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
          <p className="text-muted-foreground text-2xl mt-2">
            {productDetails?.description}
          </p>
          <div className="flex justify-between items-center mt-4">
            <p
              className={`text-3xl font-bold text-primary ${
                salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${price}
            </p>
            {salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground ">
                ${salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-1 mt-4 mb-2">
            <StarRating rating={averageReview}/>
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>
          <Separator />
          <Button onClick={() => handleAddToCart(productDetails?._id)} className="w-full mt-4 bg-orange-400 hover:bg-orange-500">
            Add To Cart
          </Button>
          <div className="max-h-[230px] overflow-auto mt-4">
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id}>
                  <h2 className="text-xl font-bold mb-4">Reviews</h2>
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                      {review?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-bold">{review?.userName}</h3>
                      <div className="flex items-start gap-1">
                        <StarRating rating={review?.reviewValue} />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {review?.reviewMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <span className="text-sm font-light text-red-500">
                Reviews not found
              </span>
            )}
          </div>
          <div className="flex flex-col mt-4">
            <div>
              <h4 className="font-bold text-lg">Write a review</h4>
              <div className="flex items-start gap-1">
                <StarRating
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Input
                type="text"
                placeholder="Write a review"
                className="w-full"
                value={reviewMessage}
                onChange={(e) => setReviewMessage(e.target.value)}
              />
              <Button
                onClick={addReview}
                className="bg-orange-400 hover:bg-orange-500"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailDialog;
