"use client";

import AllPosts from "@/components/AllPosts";
import FollowingCard from "@/components/FollowingCard";
import NewPost from "@/components/NewPost";
import ProfileCard from "@/components/ProfileCard";
import { UserContext } from "@/providers/UserContextProvider";
import { useContext } from "react";

const Home = () => {
  const { userData, fetchCurrentUser } = useContext(UserContext);
  //console.log(userData)

  return (
    <>
      <div className="p-4 grid sm:grid-cols-12 sm:gap-4">
        <div className="sm:col-span-3">
          <ProfileCard userData={userData} />
        </div>
        <div className="sm:col-span-6 flex flex-col gap-8">
          <NewPost userData={userData} fetchCurrentUser={fetchCurrentUser} />
          <AllPosts />
        </div>
        <div className="sm:col-span-3">
          <FollowingCard />
        </div>
      </div>
    </>
  );
};

export default Home;
