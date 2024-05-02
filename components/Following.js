"use client";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { IoPersonRemove } from "react-icons/io5";
import { IoPersonAdd } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UserContext } from "@/providers/UserContextProvider";

const Following = ({ personID }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [person, setPerson] = useState();

  const {userData,fetchCurrentUser}=useContext(UserContext);


  // useEffect(() => {
  //   //console.log(person);
  // }, [person]);

    //follow or unfollow people
    const followUnfollow=async(personID)=>{
      const payload={
        personID
      }
      try {
          const res=await axios.post("/api/user/follow-unfollow/",payload);
          //console.log(res.data)
          if(res.status){
              toast.success(res.data.message);
  
              //to get updated following stats
              await fetchCurrentUser();
          }
      } catch (error) {
          console.log(error)
      }
    }

  useEffect(() => {
    (async function fetchFollowers() {
      const payload = {
        personID,
      };
      try {
        setLoading(true);
        const res = await axios.post("api/others-profile", payload);
        //console.log(res.data?.personData);
        if (res.status) {
          toast.success(res.data.message);
          setPerson(res.data.personData);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [personID]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error ? (
            <div>Oops! Something went wrong...</div>
          ) : (
            <div className="p-2">
              <Toaster />
              <div className="p-1 flex items-center justify-between">
                <div
                  onClick={() => router.push(`/profile/${person?._id}`)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img
                    src={person?.profilePic}
                    alt="profile image"
                    className="w-10 h-10 rounded-full object-contain"
                  />
                  <div className="font-medium">{person?.fullname}</div>
                </div>
                <div>
                  {/* to follow or unfollow a person */}
                  {Boolean(userData?.following.includes(person?._id)) ? (
                    <IoPersonRemove
                      onClick={() => followUnfollow(person?._id)}
                      className="w-10 h-10 hover:text-violet-500"
                    />
                  ) : (
                    <IoPersonAdd
                      onClick={() => followUnfollow(person?._id)}
                      className="w-10 h-10 hover:text-violet-500"
                    />
                  )}
                </div>
                {/* <IoPersonRemove className="w-5 h-5 hover:text-pink-500" /> */}
              </div>
              <div className="border-t w-full" />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Following;
