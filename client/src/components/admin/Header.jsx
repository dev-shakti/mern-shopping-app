import { Button } from "@/components/ui/button";
import { logoutUser } from "@/redux/authSlice";
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser())
      .then((data) => {
        toast.success(data.payload.message);
      })
      .catch((error) => console.error(error));
  }
  
  return (
    <header className="flex items-center justify-between py-3 px-4 bg-background border-b">
      <Button className="lg:hidden sm:block" onClick={() => setOpen(true)}>
        <AlignJustify />
        <span className="sr-only">Toggle Menu </span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
