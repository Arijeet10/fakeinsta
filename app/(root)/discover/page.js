"use client";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { IoPersonAdd } from "react-icons/io5";
import { IoPersonRemove } from "react-icons/io5";

import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "@/providers/UserContextProvider";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const People = () => {

  const router=useRouter();

  const [people, setPeople] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const {userData,fetchCurrentUser}=useContext(UserContext);


  // useEffect(() => {
  //   console.log(Boolean(userData?.following.includes("6623f8b37d9797997b8b2937")))
  // }, [userData])
  

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

  //get list of people
  useEffect(() => {
    (async function fetchPeople() {
      try {
        setLoading(true);
        const res = await axios.get("/api/user/discover/");
        //console.log(res.data.people);
        if (res.status) {
          toast.success(res.data.message);
          setPeople(res.data.people);
          //console.log(res.data.people);
        }
      } catch (error) {
        //console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <div className="p-4">
        <Toaster />
        <div className="py-4 text-3xl font-medium">Find People to Follow</div>
        {loading ? (
          <><Loading /></>
        ) : (
          <>
            {error ? (
              <div>Oops! Something went wrong ...</div>
            ) : (
              <>
                <div className="">
                {/* show people list */}
                  {people &&
                    people.map((data, index) => {
                      return (
                        <div key={index}>
                          <div className="py-4 flex items-center justify-between">
                            <div onClick={()=>router.push(`/profile/${data?._id}`)} className="flex items-center gap-2 cursor-pointer">
                              <img
                                src={data?.profilePic}
                                alt="profile image"
                                className="h-20 w-20 rounded-full object-contain border"
                              />
                              <div className=" text-lg font-medium">
                                {data?.fullname}
                              </div>
                            </div>
                            <div>
                            {/* to follow or unfollow a person */}
                                {Boolean(userData?.following.includes(data?._id))?(
                                    <IoPersonRemove onClick={()=>followUnfollow(data?._id)} className="w-10 h-10 hover:text-violet-500" />

                                ):(
                                    <IoPersonAdd onClick={()=>followUnfollow(data?._id)} className="w-10 h-10 hover:text-violet-500" />
                                )}
                            </div>
                          </div>
                          <div className="border-t w-full" />
                        </div>
                      );
                    })}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default People;
