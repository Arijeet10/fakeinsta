"use client";

import { getUserPosts } from "@/helpers/request";
import { UserContext } from "@/providers/UserContextProvider";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoPersonAdd } from "react-icons/io5";
import { IoPersonRemove } from "react-icons/io5";

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
        <div>Loading...</div>
      ) : (
        <>
          {error ? (
            <div>Oops! Something went wrong...</div>
          ) : (
            <>
              {/* Profile Information */}
              <div className="p-6 grid items-start gap-4 grid-flow-row sm:grid-flow-col sm:grid-cols-12">
                <div className="sm:col-span-9 md:col-span-6 lg:col-span-4 flex items-center justify-center">
                  <div className="  rounded-full p-1 bg-gradient-to-r from-pink-500 to-violet-500">
                    <img
                      src={profile?.profilePic}
                      alt="user photo"
                      className="w-96 h-96 rounded-full border-2"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3 md:col-span-6 lg:col-span-8 flex flex-col items-start gap-4">
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

                  {/* Following and Followers panel */}
                  <div className="flex items-center gap-4">
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
                          className="border shadow-md p-2 rounded-md hover:bg-pink-500 hover:text-white flex items-center justify-center gap-1"
                        >
                          <IoPersonRemove className="w-10 h-10 hover:text-violet-500" />
                          <div className="text-2xl font-semibold">UNFOLLOW</div>
                        </div>
                      ) : (
                        <div
                          onClick={() => followUnfollow(profile?._id)}
                          className="border shadow-md p-2 rounded-md hover:bg-violet-500 hover:text-white flex items-center justify-center gap-1"
                        >
                          <IoPersonAdd className="w-10 h-10 hover:text-violet-500" />
                          <div className="text-2xl font-semibold">FOLLOW</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {/* Profile Posts */}
              <div className="p-2">
                <div className="text-center text-3xl font-bold">POSTS</div>
                <div className="border p-2 grid items-center justify-center gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {profilePosts &&
                    profilePosts.map((post, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => handlePostModal(post.photo)}
                          className="border shadow-sm rounded-sm"
                        >
                          <img
                            src={post.photo}
                            alt="post image"
                            className="object-cover w-[400px] sm:w-[600px] h-[500px]"
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </>
          )}
        </>
      )}
      {postModal && (
        <>
          <div
            onClick={() => setPostModal(false)}
            className="bg-[rgba(0,0,0,0.7)] fixed inset-0 "
          />
          <div className="fixed w-full sm:w-[700px] z-50 top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]">
            <img src={photoURL} alt="photo" className="" />
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
