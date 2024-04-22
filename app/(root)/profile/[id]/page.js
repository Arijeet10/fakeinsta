"use client";

import Loading from "@/components/Loading";
import { getUserPosts } from "@/helpers/request";
import { UserContext } from "@/providers/UserContextProvider";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoPersonAdd } from "react-icons/io5";
import { IoPersonRemove } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import ProfilePostCard from "@/components/ProfilePostCard";



const Profile = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [profile, setProfile] = useState();
  const [profilePosts, setProfilePosts] = useState();
  const [postModal, setPostModal] = useState(false);
  const [photoURL, setPhotoURL] = useState();
  const { userData, fetchCurrentUser } = useContext(UserContext);

  //follow or unfollow people
  const followUnfollow = async (personID) => {
    const payload = {
      personID,
    };
    //console.log(payload);
    try {
      const res = await axios.post("/api/user/follow-unfollow/", payload);
      //console.log(res);
      if (res.status) {
        toast.success(res.data.message);

        //to get updated following stats
        fetchCurrentUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostModal = (photoURL) => {
    setPostModal(true);
    setPhotoURL(photoURL);
  };

  //get profile posts
  useEffect(() => {
    if (profile) {
      (async function fetchPosts() {
        try {
          const res = await getUserPosts(profile._id);
          //console.log(res);
          if (res) {
            toast.success(res.message);
            setProfilePosts(res.profilePosts);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [profile]);

  //get profile data
  useEffect(() => {
    (async function fetchProfile() {
      const payload = {
        personID: params.id,
      };
      try {
        setLoading(true);
        const res = await axios.post("/api/others-profile", payload);
        //console.log(res);
        if (res.status) {
          toast.success(res.data.message);
          setProfile(res.data.personData);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [params]);

  return (
    <>
      <Toaster />
      {loading ? (
        <><Loading /></>
      ) : (
        <>
          {error ? (
            <div>Oops! Something went wrong...</div>
          ) : (
            <>
              {/* Profile Information */}
              <div className="p-6 grid items-start gap-4 grid-flow-row sm:grid-flow-col sm:grid-cols-12">
                <div className="sm:col-span-7 md:col-span-6 lg:col-span-4 flex items-center justify-center">
                  <div className="  rounded-full p-1 bg-gradient-to-r from-pink-500 to-violet-500">
                    <img
                      src={profile?.profilePic}
                      alt="user photo"
                      className="w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full border-2 object-contain bg-white"
                    />
                  </div>
                </div>
                <div className="sm:col-span-5 md:col-span-6 lg:col-span-8 flex flex-col gap-4">
                  <div className="text-4xl font-semibold">
                    {profile?.fullname}
                  </div>
                  <div className="text-slate-500 font-medium ">
                    {profile?.username}
                  </div>
                  <div className="text-slate-600">
                    <span className="text-black text-xl font-medium">
                      Bio:{" "}
                    </span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras lorem augue, convallis id vestibulum bibendum, ultrices
                    porta felis. Aenean faucibus dolor dolor, sit amet molestie
                    urna pretium id. Phasellus convallis enim justo, at
                    ultricies tortor consequat eu. Sed blandit vel metus eu
                    porttitor.
                  </div>

                  {/*Posts, Following and Followers Count panel */}
                  <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col ">
                      <div>
                        {profilePosts?.length}
                      </div>
                      <div className="text-lg font-semibold">
                        Posts
                      </div>
                    </div>
                    <div className="flex flex-col ">
                      <div>
                        {profile?.following?.length}
                      </div>
                      <div className="text-lg font-semibold">
                        Following
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div>
                        {profile?.followers?.length}
                      </div>
                      <div className="text-lg font-semibold">
                        Followers
                      </div>
                    </div>
                  </div>

                  {/* show follow unfollow option */}
                  {userData?._id !== profile?._id && (
                    <div>
                      {Boolean(userData?.following.includes(profile?._id)) ? (
                        <div
                          onClick={() => followUnfollow(profile?._id)}
                          className="border shadow-md p-2 rounded-md hover:bg-pink-500 hover:text-white cursor-pointer flex items-center justify-center gap-1"
                        >
                          <IoPersonRemove className="w-10 h-10 " />
                          <div className="text-2xl font-semibold">UNFOLLOW</div>
                        </div>
                      ) : (
                        <div
                          onClick={() => followUnfollow(profile?._id)}
                          className="border shadow-md p-2 rounded-md hover:bg-violet-500 hover:text-white cursor-pointer flex items-center justify-center gap-1"
                        >
                          <IoPersonAdd className="w-10 h-10 " />
                          <div className="text-2xl font-semibold">FOLLOW</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {/* Profile Posts */}
              <div className="sm:p-2">
                <div className="text-center text-3xl font-bold">POSTS</div>
                <div className="sm:border sm:p-2  grid sm:items-center sm:justify-center gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {profilePosts &&
                    profilePosts.map((post, index) => {
                      return (
                        <ProfilePostCard key={index} post={post} handlePostModal={handlePostModal} />
                      );
                    })}
                </div>
              </div>
            </>
          )}
        </>
      )}
      {/* open posts to view pictures */}
      {postModal && (
        <>
          <div
            onClick={() => setPostModal(false)}
            className="bg-[rgba(0,0,0,0.7)] fixed inset-0 "
          />
          <div className="fixed w-full sm:w-[700px] z-50 top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]">
            <img src={photoURL} alt="photo" className="w-full  h-[500px] object-cover" />
            <IoIosClose 
            onClick={()=>setPostModal(false)}
              className="absolute top-0 right-0 w-5 h-5 text-white  hover:bg-red-500 rounded-full"
            />
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
