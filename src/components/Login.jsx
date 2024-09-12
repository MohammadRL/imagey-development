import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
        navigate("/imagey/image-center");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full md:mt-20 md:static absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:w-auto md:translate-x-0 md:translate-y-0">
      <div
        className={`mx-auto w-full max-w-lg bg-[#141414] rounded-xl p-10 border border-white`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-[#eee]">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-white">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/imagey/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email : "
              placeholder="Email Address"
              type="email"
              {...register("email", {
                required: true,
              })}
            />
            <Input
              label="Password : "
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            <Button
              type="submit"
              className="w-full"
              textColor="text-[#eee]"
              bgColor="bg-[#242529]"
            >
              Sign in{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
