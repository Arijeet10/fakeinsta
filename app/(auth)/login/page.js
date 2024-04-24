"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillInstagram } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import Loading from "@/components/Loading";
import LoginCard from "@/components/LoginCard";

const url = process.env.NEXT_PUBLIC_ROOT_URL;

const Login = () => {
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    //console.log(loginData);
    const formData = new FormData();
    formData.set("email", loginData.email);
    formData.set("password", loginData.password);
    // console.log(formData)
    try {
      const res = await axios.post(url + "api/login", formData);
      //console.log(res);
      if (res.status) {
        toast.success(res.data.message);
        setLoginData({
          email: "",
          password: "",
        });
        toast("Redirecting to HomePage", {
          duration: 5000,
        });
        router.push("/");
      } else {
        toast.custom(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="absolute top-20 left-2/4 translate-x-[-50%]  sm:w-[500px] w-full flex flex-col gap-4 ">
        <Toaster />
        <div className="p-8 m-2 border border-slate-300">

        {/* Fake Instagram Illutration */}
          <div className="pb-4 flex flex-col items-center">
            <AiFillInstagram className=" w-40 h-40  hover:text-pink-500" />
            <div className="text-2xl font-bold font-[cursive]">FakeInsta</div>
          </div>

          {/* login form */}
          <div className="">
            <LoginCard
              handleSubmit={handleSubmit}
              loginData={loginData}
              setLoginData={setLoginData}
            />
          </div>
        </div>

        {/* Go To Sign Up Page */}
        <div className="p-4 m-2 border border-slate-300">
          <div className="py-2 flex flex-col items-center font-medium">
            <div>Don't have an account?</div>
            <Link
              href="/signup"
              className="text-pink-700 hover:text-blue-500 cursor-pointer font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Login;
