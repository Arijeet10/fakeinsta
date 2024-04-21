"use client";

import AllPosts from "@/components/AllPosts";
import FollowingCard from "@/components/FollowingCard";
import Loading from "@/components/Loading";
import NewPost from "@/components/NewPost";
import ProfileCard from "@/components/ProfileCard";
import { UserContext } from "@/providers/UserContextProvider";
import { useContext } from "react";

const Home = () => {
  const { userData, fetchCurrentUser, loading, error } =
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
            <div className="p-4 grid sm:grid-cols-12 sm:gap-4">
              <div className="sm:col-span-5 md:col-span-4">
                <ProfileCard userData={userData} />
              </div>
              <div className="sm:col-span-7 md:col-span-5 flex flex-col gap-8">
                <NewPost
                  userData={userData}
                  fetchCurrentUser={fetchCurrentUser}
                />
                <AllPosts />
              </div>
              <div className="hidden md:block md:col-span-3">
                <FollowingCard />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
