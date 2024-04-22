"use client";

import { MdDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

import { useContext, useState } from "react";
import { UserContext } from "@/providers/UserContextProvider";
import { deletePost } from "@/helpers/request";
import toast, { Toaster } from "react-hot-toast";
import { PostsContext } from "@/providers/PostsContextProvider";
import { IoIosClose } from "react-icons/io";

const ProfilePostCard = ({ post, handlePostModal }) => {
  const [modal, setModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { userData } = useContext(UserContext);
  const { fetchAllPosts } = useContext(PostsContext);

  //open delete confirmation popup
  const openConfirmDelete = () => {
    setConfirmDelete(true);
    setModal(false);
  };

  //to delete your post
  const handleDeletePost = async (postID) => {
    console.log(postID)
    try {
      const res = await deletePost(postID);
      toast.success(res.message);
      setConfirmDelete(false);
      await fetchAllPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="border shadow-sm rounded-sm">
        <Toaster />

        {/* get edit delete options if for logged in user only */}
        {userData?._id === post?.userID && (
          <div className="relative flex items-center justify-end">
            <BsThreeDotsVertical
              onClick={() => setModal(!modal)}
              className="w-8 h-8 hover:text-pink-500"
            />
            {modal && (
              <>
                <div className=" absolute top-10 right-7 z-50 bg-white   border rounded-lg shadow-md ">
                  <div className="p-2 flex items-center justify-between hover:text-indigo-500">
                    <div>Edit</div>
                    <MdEdit className="w-8 h-8 " />
                  </div>
                  <div
                    onClick={() => openConfirmDelete()}
                    className="p-2 flex items-center justify-between hover:text-red-500"
                  >
                    <div>Delete</div>
                    <MdDelete className="w-8 h-8 " />
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Post Image */}
        <img
          onClick={() => handlePostModal(post.photo)}
          src={post.photo}
          alt="post image"
          className="object-contain w-full rounded-sm sm:w-[600px] h-[500px]"
        />

        {/* Post Caption */}
        <div>{post?.caption}</div>
      </div>

      {/* delete confirm message popoup */}
      {confirmDelete && (
        <>
          <div
            onClick={() => setConfirmDelete(false)}
            className="bg-[rgba(0,0,0,0.7)] fixed inset-0 "
          />
          <div className="w-full sm:w-[500px] p-2 rounded-lg fixed bg-white z-50 top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] ">
            <div className="py-2 flex items-center justify-end">
              <IoIosClose
                onClick={() => setConfirmDelete(false)}
                className="h-10 w-10 hover:text-red-500"
              />
            </div>
            <div className="py-2 text-lg font-semibold">
              Confirm Delete Post?
            </div>
            <div className="py-4 font-medium flex items-center justify-between">
              <button
                onClick={() => handleDeletePost(post?._id)}
                className="px-4 py-2 rounded-lg border bg-pink-500 text-white hover:bg-violet-500"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 rounded-lg border bg-violet-500 text-white hover:bg-red-500"
              >
                No
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfilePostCard;
