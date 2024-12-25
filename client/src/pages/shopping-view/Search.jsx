import ProductDetailDialog from "@/components/shopping-view/ProductDetailDialog";
import ShoppingProductCard from "@/components/shopping-view/ShoppingProductCard";
import { Input } from "@/components/ui/input";
import { addToCart, fetchCartItems } from "@/redux/shop/cartSlice";
import { fetchProductDetails } from "@/redux/shop/productSlice";
import { getSearchResults, resetSearchResults } from "@/redux/shop/searchSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const SearchProducts = () => {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.productSearch);
  const {cartItems } = useSelector((state) => state.shoppingCart);
  const { productDetails } = useSelector(
    (state) => state.shoppingProducts
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [dispatch, keyword, setSearchParams]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  const handleAddToCart = (getCurrentProductId) => {

    // Dispatch addToCart action if product is not in cart
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    )
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast.success(data.payload.message);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

   const handleGetProductDetails = (getCurrentProductId) => {
      dispatch(fetchProductDetails(getCurrentProductId));
    };

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6"
            placeholder="Search Products..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((result) => (
            <ShoppingProductCard
              product={result}
              key={result._id}
              handleAddToCart={handleAddToCart}
              handleGetProductDetails={handleGetProductDetails}
            />
          ))
        ) : (
          <span className="text-3xl font-bold">No Results Found !</span>
        )}
      </div>
      <ProductDetailDialog
            open={openDetailsDialog}
            setOpen={setOpenDetailsDialog}
            productDetails={productDetails}
          />
    </div>
  );
};

export default SearchProducts;
