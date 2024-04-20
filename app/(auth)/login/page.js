"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoCloseCircleSharp } from "react-icons/io5";
import toast,{Toaster} from "react-hot-toast";

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
        const res=await axios.post(url+"/api/login",formData);
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
      <div className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] border shadow-md sm:w-[400px] p-2">
      <Toaster />
        <div className="flex items-center justify-between py-4">
          <div className="font-semibold uppercase text-2xl">Login</div>
          <button>
            <IoCloseCircleSharp className="w-10 h-10 hover:text-red-500" />
          </button>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="enter your email id"
            className="border border-black rounded-sm focus:outline-none p-1"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="enter your password"
            className="border border-black rounded-sm focus:outline-none p-1"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          {loading ? (
            <AiOutlineLoading3Quarters
              type="submit"
              className="bg-blue-700 text-white w-full h-10 p-2 "
            />
          ) : (
            <input
              type="submit"
              value="Login"
              className="bg-blue-700 text-white hover:bg-blue-500 font-medium uppercase p-2 rounded-sm "
            />
          )}
        </form>
        <div className="py-2">
          <div className="w-full border-t  " />
          <div className="py-2 flex flex-col items-center font-medium">
            <div>Don't have an account?</div>
            <Link
              href="/signup"
              className="text-yellow-700 hover:text-yellow-500 cursor-pointer font-medium"
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
