"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiFillInstagram } from "react-icons/ai";
import { MdAddAPhoto } from "react-icons/md";
import { FaCameraRetro } from "react-icons/fa";


import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

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

  const inputFileRef = useRef();

  const handleProfilePic = () => {
    inputFileRef.current.click();
  };

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
      <div className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] sm:w-[500px] w-full p-2">
        <Toaster />
        <div className="pb-4 flex items-center justify-center gap-6">
          <AiFillInstagram 
            className="w-40 h-40 text-pink-500 hover:text-violet-500"
          />
          <div className="text-2xl font-bold">FakeInsta</div>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className=" flex flex-col gap-4">
          <div className="">
            <div onClick={() => handleProfilePic()} className="cursor-pointer">
              <input
                id="profilePic"
                type="file"
                className="hidden"
                ref={inputFileRef}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    profilePic: e.target.files[0],
                  })
                }
              />
              {Boolean(signupData.profilePic?.name) ? (
                <div className="p-1 border border-pink-500 rounded-md focus:border-violet-500 flex items-center justify-start gap-6 text-pink-500 hover:text-violet-500">
                <FaCameraRetro 
                  className="w-10 h-10"
                />
                <div>{signupData.profilePic?.name}</div>
                </div>
              ) : (
                <div className="p-1 border border-pink-500 rounded-md focus:border-violet-500 flex items-center justify-start gap-6 text-pink-500 hover:text-violet-500">
                  <MdAddAPhoto className="w-10 h-10" />
                  <div className="font-medium">Upload Profile Pic</div>
                </div>
              )}
            </div>
          </div>
          <input
            type="text"
            placeholder="enter your full name"
            className="border border-pink-500 rounded-md focus:border-violet-500 focus:outline-none placeholder:text-pink-500 text-pink-500 focus:text-violet-500 p-1"
            value={signupData.fullname}
            onChange={(e) =>
              setSignupData({ ...signupData, fullname: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="enter username"
            className="border border-pink-500 rounded-md focus:border-violet-500 focus:outline-none placeholder:text-pink-500 text-pink-500 focus:text-violet-500 p-1"
            value={signupData.username}
            onChange={(e) =>
              setSignupData({ ...signupData, username: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="enter your email id"
            className="border border-pink-500 rounded-md focus:border-violet-500 focus:outline-none placeholder:text-pink-500 text-pink-500 focus:text-violet-500 p-1"
            value={signupData.email}
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="enter your password"
            className="border border-pink-500 rounded-md focus:border-violet-500 focus:outline-none placeholder:text-pink-500 text-pink-500 focus:text-violet-500 p-1"
            value={signupData.password}
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
          />
          {loading ? (
<Loading />
          ) : (
            <input
              type="submit"
              value="Signup"
              className=" bg-gradient-to-r from-pink-500 to-violet-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 text-white font-medium uppercase p-2 rounded-md "
            />
          )}
        </form>
        <div className="py-2">
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
