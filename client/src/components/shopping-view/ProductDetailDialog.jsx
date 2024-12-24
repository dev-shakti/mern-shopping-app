import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {} from "@radix-ui/react-avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import StarRating from "../common/StarRating";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductReview } from "@/redux/shop/productReviewSlice";

const ProductDetailDialog = ({ open, setOpen, productDetails }) => {

  const [reviewMessage,setReviewMessage]=useState('');
  const [rating,setRating]=useState(0);
  const {user}=useSelector((state) =>state.auth)
  const dispatch=useDispatch();

  const addReview = () => {
    dispatch(addProductReview({
      productId:productDetails?.id,
      userId:user?.id,
      userName:user?.userName, 
      reviewMessage:reviewMessage, 
      reviewValue:rating
    })).then((data) => {
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleRatingChange = (getRating) => {
    setRating(getRating)
  }

  const handleDialogClose = () => {
    setRating(0)
    setReviewMessage("")
    setOpen(false)
  }

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
          {/* <div className="flex justify-between items-center mt-4">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground ">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div> */}
          <div className="flex items-start gap-1 mt-4 mb-2">
          <StarRating/>
          </div>
          <Separator />
          <Button className="w-full mt-4 bg-orange-400 hover:bg-orange-500">
            Add To Cart
          </Button>
          <div className="max-h-[300px] overflow-auto mt-4">
            <div>
              <h2 className="text-xl font-bold mb-4">Reviews</h2>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold">John Doe</h3>
                  <div className="flex items-start gap-1">
                  <StarRating/>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is an amazing product
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <div>
              <h4 className="font-bold text-lg">Write a review</h4>
              <div className="flex items-start gap-1">
               <StarRating rating={rating} handleRatingChange={handleRatingChange}/>
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
              <Button onClick={addReview} className="bg-orange-400 hover:bg-orange-500">
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
