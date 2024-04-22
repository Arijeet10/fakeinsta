"use client";

import { PostsContext } from "@/providers/PostsContextProvider";
import { useContext } from "react";
import PostCard from "./PostCard";
import Loading from "./Loading";

const AllPosts = () => {
  const { posts, fetchAllPosts, error } = useContext(PostsContext);
  //console.log(posts);
  return (
    <>
          {error ? (
            <div>Oops! Something went wrong...</div>
          ) : (
            <>
              <div className="flex flex-col gap-4">
                {posts?.map((post, i) => {
                  return (
                    <PostCard
                      post={post}
                      fetchAllPosts={fetchAllPosts}
                      key={i}
                    />
                  );
                })}
              </div>
            </>
          )}
    </>
  );
};

export default AllPosts;
