"use client";

import { PostsContext } from "@/providers/PostsContextProvider";
import { useContext } from "react";
import PostCard from "./PostCard";

const AllPosts = () => {
  const { posts, fetchAllPosts } = useContext(PostsContext);
  //console.log(posts);
  return (
    <>
      <div className="flex flex-col gap-4">
        {posts?.map((post, i) => {
          return <PostCard post={post} fetchAllPosts={fetchAllPosts} key={i} />;
        })}
      </div>
    </>
  );
};

export default AllPosts;
