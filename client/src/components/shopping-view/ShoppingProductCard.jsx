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
        <img
          src={product?.image}
          alt={product?.title}
          className="h-[250px] object-cover w-full rounded-t-lg"
        />
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
        <Button
          onClick={() => handleAddToCart(product._id)}
          className="bg-orange-400 hover:bg-orange-500 w-full"
        >
          Add To Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductCard;
