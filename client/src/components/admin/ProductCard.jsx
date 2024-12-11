import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

const ProductCard = ({ product }) => {

  
  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg hover:shadow-xl cursor-pointer rounded-lg">
      <div>
        <img
          src={product.image}
          alt={product.title}
          className="h-[250px] object-cover w-full rounded-t-lg"
        />
      </div>
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-2">{product.title}</h2>
        <div className="flex justify-between items-center mb-2">
          <p className="font-medium text-gray-600">
            Price: <span className="text-red-500">{product.price}</span>
          </p>
          <p className="font-medium  text-gray-600">
            SalePrice: <span className="text-red-500">{product.salePrice}</span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end items-center gap-4">
        <Button
          variant="outline"
          className="px-3 py-1"
          onClick={() => handleEdit(product._id)}
        >
          Edit
        </Button>
        <Button
          className="px-3 py-1 bg-orange-400 hover:bg-orange-300"
          onClick={() => handleDelete(product._id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
