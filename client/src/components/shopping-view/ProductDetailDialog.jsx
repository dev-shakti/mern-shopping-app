import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {  } from "@radix-ui/react-avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";

const ProductDetailDialog = ({ open, setOpen, productDetails }) => {
  console.log(productDetails)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
          </div>
          <Separator />
          <Button className="w-full mt-4 bg-orange-300 hover:bg-orange-400">
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
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is an amazing product
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Input
              type="text"
              placeholder="Write a review"
              className="w-full"
            />
            <Button className="bg-orange-300 hover:bg-orange-400">
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailDialog;
