"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoCloseCircleSharp } from "react-icons/io5";
import { AiFillInstagram, AiOutlineLoading3Quarters } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
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
    console.log(signupData);
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
      <div className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] border shadow-md sm:w-[500px] p-2">
        <Toaster />
        <div className="flex items-center justify-center gap-6">
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
                <div>{signupData.profilePic?.name}</div>
              ) : (
                <div className="flex flex-col items-center">
                  <CgProfile className="w-10 h-10" />
                  <div className="font-medium">Upload Photo</div>
                </div>
              )}
            </div>
          </div>
          <input
            type="text"
            placeholder="enter your full name"
            className="border border-black rounded-sm focus:outline-none p-1"
            value={signupData.fullname}
            onChange={(e) =>
              setSignupData({ ...signupData, fullname: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="enter username"
            className="border border-black rounded-sm focus:outline-none p-1"
            value={signupData.username}
            onChange={(e) =>
              setSignupData({ ...signupData, username: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="enter your email id"
            className="border border-black rounded-sm focus:outline-none p-1"
            value={signupData.email}
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="enter your password"
            className="border border-black rounded-sm focus:outline-none p-1"
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
              className=" bg-gradient-to-r from-pink-500 to-violet-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 text-white font-medium uppercase p-2 rounded-sm "
            />
          )}
        </form>
        <div className="py-2">
          <div className="w-full border-t  " />
          <div className="py-2 flex flex-col items-center font-medium">
            <div>Already have an account?</div>
            <Link
              href="/login"
              className="text-yellow-700 hover:text-yellow-500 cursor-pointer font-medium"
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
