import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      console.log(data);
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login({ userData }));
        navigate("/imagey/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center md:mt-20 md:static absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full md:w-auto md:translate-x-0 md:translate-y-0">
      <div
        className={`mx-auto w-full max-w-lg bg-[#141414] rounded-xl p-10 border border-white`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-[#eee]">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-[#aaa]">
          Already have an account?&nbsp;
          <Link
            to="/imagey/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              {...register("name", { required: true })}
              label="Full Name : "
              placeholder="Full Name"
            />
            <Input
              {...register("email", {
                required: true,
              })}
              label="Email : "
              placeholder="Email Address"
              type="email"
            />
            <Input
              {...register("password", { required: true })}
              label="Password : "
              type="password"
              placeholder="Password"
            />
            <Button
              type="submit"
              className="w-full"
              textColor="text-[#eee]"
              bgColor="bg-[#242529]"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
