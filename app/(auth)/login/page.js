"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoCloseCircleSharp } from "react-icons/io5";
import { AiFillInstagram } from "react-icons/ai";
import toast,{Toaster} from "react-hot-toast";
import Loading from "@/components/Loading";

const url = process.env.NEXT_PUBLIC_ROOT_URL;


const Login = () => {

    const router=useRouter();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading,setLoading]=useState(false);

  const handleSubmit = async(e) => {
    setLoading(true);
    e.preventDefault();
    console.log(loginData);
    const formData=new FormData();
    formData.set("email",loginData.email);
    formData.set("password",loginData.password);
    // console.log(formData)
    try {
        const res=await axios.post(url+"api/login",formData);
        console.log(res)
        if(res.status){
            toast.success(res.data.message);
            setLoginData({
                email: "",
                password: "",
              });
            router.push("/");
        }else{
            toast.custom(res.data.message);
        }
    } catch (error) {
        toast.error(error?.response?.data?.message)
        console.log(error)
    } finally{
        setLoading(false);
    }

  };

  return (
    <>
      <div className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] sm:w-[400px] w-full p-2">
      <Toaster />
        <div className="pb-4 flex flex-col items-center">
          <AiFillInstagram 
            className="w-40 h-40 text-pink-500 hover:text-violet-500"
          />
          <div className="text-2xl font-bold">FakeInsta</div>
        </div>

        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="enter your email id"
            className="border border-pink-500 rounded-md focus:border-violet-500 focus:outline-none placeholder:text-pink-500 text-pink-500 focus:text-violet-500 p-1"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="enter your password"
            className="border border-pink-500 rounded-md focus:border-violet-500 focus:outline-none placeholder:text-pink-500 text-pink-500 focus:text-violet-500 p-1"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          {loading ? (
            <Loading />
          ) : (
            <input
              type="submit"
              value="Login"
              className="bg-gradient-to-r from-pink-500 to-violet-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 text-white font-medium uppercase p-2 rounded-md "
            />
          )}
        </form>
        <div className="py-2">
          <div className="w-full border-t  " />
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
