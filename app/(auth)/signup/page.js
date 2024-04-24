"use client";

import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiFillInstagram } from "react-icons/ai";


import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import SignupCard from "@/components/SignupCard";

const url = process.env.NEXT_PUBLIC_ROOT_URL;

const Signup = () => {
  const router = useRouter();

  const [signupData, setSignupData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    profilePic: "",
  });

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    //console.log(signupData);
    const formData = new FormData();
    formData.set("fullname", signupData.fullname);
    formData.set("username", signupData.username);
    formData.set("email", signupData.email);
    formData.set("password", signupData.password);
    formData.set("profilePic", signupData.profilePic);
    try {
      const res = await axios.post(url + "api/signup", formData);
      //console.log(res)
      if (res.status) {
        toast.success(res.data.message);
        setSignupData({
          fullname: "",
          username: "",
          email: "",
          password: "",
          profilePic: "",
        });
        toast("Redirecting to Login Page", {
          duration: 5000,
        });
        router.push("/login");
      } else {
        toast.custom(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      // console.log(error?.response?.data?.message)
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
          <div className="pb-4 flex flex-col items-center justify-center">
            <AiFillInstagram className="w-40 h-40  hover:text-violet-500" />
            <div className="text-2xl font-bold font-[cursive]">FakeInsta</div>
          </div>

          {/* Signup form */}
          <div>
            <SignupCard
              handleSubmit={handleSubmit}
              signupData={signupData}
              setSignupData={setSignupData}
              loading={loading}
            />
          </div>

        </div>

        {/* Go To Log in Page */}
        <div className="p-4 m-2 border border-slate-300">
          <div className="w-full border-t  " />
          <div className="py-2 flex flex-col items-center font-medium">
            <div>Already have an account?</div>
            <Link
              href="/login"
              className="text-pink-700 hover:text-blue-500 cursor-pointer font-medium"
            >
              Login
            </Link>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Signup;
