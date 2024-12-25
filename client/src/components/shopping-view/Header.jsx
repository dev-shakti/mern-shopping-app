import { shoppingViewHeaderMenuItems } from "@/config";
import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import UserCartWrapper from "./UserCartWrapper";
import { fetchCartItems } from "@/redux/shop/cartSlice";

function MenuItems() {

  const navigate=useNavigate();

  return (
    <nav className="flex flex-col md:flex-row md:items-center gap-4">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
        onClick={() => navigate(menuItem.path)}
          key={menuItem.id}
          className="text-xs uppercase font-normal text-gray-600 hover:text-gray-700 cursor-pointer transition duration-200"
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  const nagivate=useNavigate();

  const totalQuantity =
    cartItems &&
    cartItems.items &&
    cartItems.items.length > 0 &&
    cartItems.items
      ?.reduce((acc, currentItem) => {
        return acc + Number(currentItem?.quantity || 0);
      }, 0)
      
  
  function handleLogout() {
    dispatch(logoutUser())
      .then((data) => {
        toast.success(data.payload.message);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (user.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user.id]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          className="relative"
          variant="ouline"
          size="icon"
        >
          <ShoppingCart className="w-6 h-6 text-gray-700" />
          <span className="absolute top-[-1px] right-[1px] bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
            {totalQuantity || "0"}
          </span>
        </Button>
        <UserCartWrapper
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
          setOpenCartSheet={setOpenCartSheet}
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              CN
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => nagivate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const ShoppingHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center h-16 px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
