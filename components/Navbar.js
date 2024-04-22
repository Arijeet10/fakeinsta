"use client";


import { logoutUser } from "@/helpers/request";
import { UserContext } from "@/providers/UserContextProvider";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { IoMdHome } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { IoExit } from "react-icons/io5";
import toast,{Toaster} from "react-hot-toast";



const Navbar = () => {

    const router=useRouter();

    const {userData}=useContext(UserContext);

    const handleLogout=async()=>{
        try {
            const res=await logoutUser();
            if(res.success){
                toast.success(res.message);
                router.push("/login");
            }
        } catch (error) {
            console.log(error)
            toast.error("Logout Error");
        }
    }


    return ( 
        <>
        <Toaster />
            <div className="sticky top-0 bg-white z-50 p-2 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-lg">
                <div className="flex items-center justify-center">
                    <AiFillInstagram 
                        className="w-16 h-16 text-pink-500 hover:text-violet-500"
                    />
                    <div className="text-2xl font-semibold">FakeInsta</div>
                </div>
                <div className="sm:pr-4 flex items-center justify-between gap-4 font-medium ">
                    <div onClick={()=>router.push("/")} className="flex flex-col items-center hover:text-pink-500 cursor-pointer">
                        <IoMdHome 
                            className="w-7 h-7 "
                        />
                        <div className="">Feed</div>
                    </div>
                    <div onClick={()=>router.push("/discover")} className="flex flex-col items-center hover:text-pink-500 cursor-pointer">
                        <IoPeopleSharp 
                            className="w-7 h-7 "
                        />
                        <div>People</div>
                    </div>
                    <div onClick={()=>router.push(`/profile/${userData?._id}`)} className="flex flex-col items-center cursor-pointer hover:text-pink-500  ">
                        <div className="bg-gradient-to-r from-pink-500 to-violet-500 rounded-full p-1">
                        <img 
                            src={userData?.profilePic}
                            alt="user image"
                            className="w-5 h-5 rounded-full border-2 object-cover"
                        />
                        </div>
                        <div>Profile</div>
                    </div>
                    <div onClick={()=>handleLogout()} className="flex flex-col items-center cursor-pointer text-pink-500 hover:text-red-500">
                        <IoExit 
                            className="w-7 h-7 "
                        />
                        <div>
                            LOGOUT
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Navbar;