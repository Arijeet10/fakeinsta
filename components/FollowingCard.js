"use client";


import { UserContext } from "@/providers/UserContextProvider";
import { useContext, useEffect, useState } from "react";
import Following from "./Following";

const FollowingCard = () => {

  const {userData}=useContext(UserContext);

  const [following,setFollowing]=useState();

//store following data for api call
  useEffect(() => {

    setFollowing(userData?.following)

  }, [userData])
  

  return (
    <>
      <div className="p-2 border shadow-md rounded-md">
        <div className="font-semibold">Following:</div>
        <div className="">
        {following && following.map((personID,index)=>{
          return <Following key={index} personID={personID} />
        })}
        </div>
      </div>
    </>
  );
};

export default FollowingCard;
