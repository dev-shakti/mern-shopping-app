import { useEffect, useState } from "react";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import BannerThree from "../../assets/banner-3.webp";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/redux/shop/cartSlice";
import {
  fetchProductDetails,
  getFilterProducts,
} from "@/redux/shop/productSlice";
import ShoppingProductCard from "@/components/shopping-view/ShoppingProductCard";
import { toast } from "sonner";
import ProductDetailDialog from "@/components/shopping-view/ProductDetailDialog";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

const imageList = [bannerOne, bannerTwo, BannerThree];

const ShoppingHome = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shoppingProducts
  );
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFilterProducts());
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % imageList.length);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  const handleAddToCart = (getCurrentProductId,getTotalStock) => {  
    let getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId._id === getCurrentProductId
      );
      
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.success(
            `Only ${getQuantity} quantity can be added for this item`
          );
          return;
        }
      }
    } 
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
    <div className="min-h-screen flex flex-col">
      <div className="relative w-full h-[600px] overflow-hidden">
        {imageList && imageList.length > 0
          ? imageList.map((image, index) => (
              <img
                src={image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + imageList.length) % imageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % imageList.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop By Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((category) => (
              <Card
                key={category.label}
                className="cursor-pointer shadow-lg rounded-lg hover:shadow-xl"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <category.icon className="w-12 h-12 mb-4  text-muted-foreground" />
                  <span className="font-semibold text-gray-700 text-sm ">
                    {category.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 ">
        <div className="container mx-auto px-4 flex flex-col">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {productList && productList.length > 0 ? (
              productList.map((product) => (
                <ShoppingProductCard
                  key={product._id}
                  product={product}
                  handleAddToCart={handleAddToCart}
                  handleGetProductDetails={handleGetProductDetails}
                />
              ))
            ) : (
              <span className="text-xl text-red-500 font-semibold text-center ">
                No Products Found
              </span>
            )}
            <ProductDetailDialog
              open={openDetailsDialog}
              setOpen={setOpenDetailsDialog}
              productDetails={productDetails}
              handleAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop By Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                key={brandItem.label}
                className="cursor-pointer shadow-lg rounded-lg hover:shadow-xl"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4  text-muted-foreground" />
                  <span className="font-semibold text-gray-700 text-sm ">
                    {brandItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <footer className="bg-gray-900 text-white py-6 mt-10">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-xl font-semibold mb-2">About Us</h3>
            <p className="text-sm">
              Welcome to our eCommerce store. We offer high-quality products at
              the best prices. Customer satisfaction is our top priority.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm space-y-1">
              <li>
                <a href="/" className="hover:text-gray-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="hover:text-gray-400">
                  Shop
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
            <p className="text-sm">Email: support@example.com</p>
            <p className="text-sm">Phone: +1 (123) 456-7890</p>
            <p className="text-sm">Address: 123 Main St, Anytown, USA</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-4 text-center pt-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} eCommerce Store. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ShoppingHome;
