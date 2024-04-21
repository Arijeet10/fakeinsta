"use client";


import { UserContext } from "@/providers/UserContextProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { IoMdHome } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";


const Navbar = () => {

    const router=useRouter();

    const {userData}=useContext(UserContext);


    return ( 
        <>
            <div className="p-2 flex items-center justify-between shadow-lg">
                <div className="flex items-center">
                    <AiFillInstagram 
                        className="w-16 h-16 text-pink-500 hover:text-violet-500"
                    />
                    <div className="text-2xl font-semibold">FakeInsta</div>
                </div>
                <div className="sm:pr-4 flex items-center gap-4 font-medium ">
                    <div onClick={()=>router.push("/")} className="flex flex-col items-center hover:text-pink-500 cursor-pointer">
                        <IoMdHome 
                            className="w-5 h-5 "
                        />
                        <div className="">Feed</div>
                    </div>
                    <div onClick={()=>router.push("/discover")} className="flex flex-col items-center hover:text-pink-500 cursor-pointer">
                        <IoPeopleSharp 
                            className="w-5 h-5 "
                        />
                        <div>People</div>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer hover:text-pink-500 ">
                        <img 
                            src={userData?.profilePic}
                            alt="user image"
                            className="w-5 h-5 rounded-full"
                        />
                        <div>Profile</div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Navbar;