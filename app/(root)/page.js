"use client";

import AllPosts from "@/components/AllPosts";
import FriendsCard from "@/components/FriendsCard";
import NewPost from "@/components/NewPost";
import ProfileCard from "@/components/ProfileCard";
import { UserContext } from "@/providers/UserContextProvider";
import { useContext } from "react";

const Home = () => {


    const {userData,fetchCurrentUser}=useContext(UserContext)
    //console.log(userData)

    

    return ( 
        <>
            <div className="grid sm:grid-cols-12 sm:gap-4">
            <div className="sm:col-span-3">
            <ProfileCard userData={userData} />
            </div>
            <div className="sm:col-span-6 flex flex-col gap-8">
            <NewPost userData={userData} fetchCurrentUser={fetchCurrentUser} />
            <AllPosts />
            </div>
            <div className="sm:col-span-3">
            <FriendsCard />
            </div>
            </div>
        </>
     );
}
 
export default Home;

