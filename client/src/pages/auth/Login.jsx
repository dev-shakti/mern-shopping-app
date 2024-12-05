import CommonForm from "@/components/common/Form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/redux/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link} from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();

    dispatch(loginUser(formData))
      .then((data) => {
        if (data?.payload?.success) {
          toast.success(data.payload.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.payload?.message || error?.message || "Something went wrong!"
        );
      });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Dont have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Login;
