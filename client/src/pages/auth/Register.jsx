import CommonForm from "@/components/common/Form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/redux/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const data = await dispatch(registerUser(formData)).unwrap();
      if(data.success){
          navigate("/auth/login")
          toast.success(data.message)
      }
    } catch (error) {
      console.error(error);
      toast.error( error?.message || "Something went wrong!")
    }
  };
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create an account
        </h1>
        <p className="mt-2">
          Already have account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Register;
