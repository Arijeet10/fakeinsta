"use client";

import { PostsContext } from "@/providers/PostsContextProvider";
import { useContext, useEffect } from "react";
import PostCard from "./PostCard";

const AllPosts = () => {
  const { posts, fetchAllPosts, error } = useContext(PostsContext);
  //console.log(posts);

  useEffect(() => {
    fetchAllPosts();
  }, [])
  

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
