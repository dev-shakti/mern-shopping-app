
import CommonForm from "@/components/common/Form"
import {registerFormControls } from "@/config"
import { useState } from "react"
import { Link } from "react-router-dom"


const Login = () => {
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })


  const onSubmit = (e) => {
    e.preventDefault()
    //api implementation
    console.log(formData)
  }
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
  )
}

export default Login

