import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

const ShoppingProductCard = ({
  product,
  handleGetProductDetails,
  handleAddToCart,
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg hover:shadow-xl cursor-pointer rounded-lg">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="h-[250px] object-cover w-full rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-gray-500 hover:bg-gray-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>

        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-muted-foreground capitalize">
              {product?.category}
            </p>
            <p className="text-sm text-muted-foreground capitalize">
              {product?.brand}
            </p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="font-medium text-gray-600 text-sm">
              Price:{" "}
              <span
                className={`${
                  product.salePrice > 0
                    ? "line-through text-gray-800"
                    : "text-gray-800"
                } font-semibold`}
              >
                ${product.price}
              </span>
            </p>
            {product.salePrice > 0 ? (
              <p className="font-medium  text-gray-600 text-sm">
                SalePrice:{" "}
                <span className="text-gray-800 font-semibold">
                  ${product.salePrice}
                </span>
              </p>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex justify-end items-center gap-4">
        {product?.totalStock === 0 ? (
          <Button
            className="opacity-60 cursor-not-allowed w-full"
          >
            Out of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddToCart(product._id,product?.totalStock)}
            className="bg-orange-400 hover:bg-orange-500 w-full"
          >
            Add To Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductCard;
