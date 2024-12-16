import ProductDetailDialog from "@/components/shopping-view/ProductDetailDialog";
import ProductFilter from "@/components/shopping-view/ProductFilter";
import ShoppingProductCard from "@/components/shopping-view/ShoppingProductCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import {
  fetchProductDetails,
  getFilterProducts,
} from "@/redux/shop/productSlice";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShopListing = () => {
  const [sort, setSort] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shoppingProducts
  );

  useEffect(() => {
    dispatch(getFilterProducts())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  useEffect(() => {
    console.log("Product details:", productDetails);
    if(productDetails!==null) setOpenDetailsDialog(true)
  }, [productDetails]);

  const handleSort = (value) => {
    setSort(value);
  };

  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(fetchProductDetails(getCurrentProductId))
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full px-4 py-12 ">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-6 ">
        {/* product filters */}
        <ProductFilter />
        <div className="flex-1">
          <div className="bg-background w-full rounded-lg shadow-sm">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-extrabold">All Products</h2>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">
                  {productList?.length} Products
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <ArrowUpDownIcon className="w-4 h-4" />
                      Sort By
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuRadioGroup
                      value={sort}
                      onValueChange={handleSort}
                    >
                      {sortOptions.map((sortItem) => (
                        <DropdownMenuRadioItem
                          value={sortItem.id}
                          key={sortItem.id}
                          className="cursor-pointer"
                        >
                          {sortItem.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          {/* productlist grid layout */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 space-y-4 md:space-y-0">
            {productList && productList.length > 0 ? (
              productList.map((product) => (
                <ShoppingProductCard
                  key={product._id}
                  product={product}
                  handleGetProductDetails={handleGetProductDetails}
                />
              ))
            ) : (
              <span className="text-xl text-red-500 font-semibold text-center ">
                No Products Found
              </span>
            )}
          </div>
          <ProductDetailDialog
            open={openDetailsDialog}
            setOpen={setOpenDetailsDialog}
            productDetails={productDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopListing;
