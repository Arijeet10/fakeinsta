"use client";

import AllPosts from "@/components/AllPosts";
import FollowingCard from "@/components/FollowingCard";
import Loading from "@/components/Loading";
import NewPost from "@/components/NewPost";
import ProfileCard from "@/components/ProfileCard";
import { UserContext } from "@/providers/UserContextProvider";
import { useContext } from "react";

const Home = () => {
  const { userData, loading, error } =
    useContext(UserContext);
  //console.log(userData)

  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          {error ? (
            <div>Oops! Something went wrong...</div>
          ) : (
            <div className="p-1 sm:p-4 sm:grid sm:grid-cols-12 sm:gap-4">
              <div className="hidden sm:block sm:col-span-5 md:col-span-4">
                <ProfileCard userData={userData} />
                <FollowingCard />
              </div>
              <div className="sm:col-span-7 md:col-span-8 flex flex-col gap-6">
                <NewPost
                  userData={userData}
                />
                <AllPosts />
              </div>

            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
