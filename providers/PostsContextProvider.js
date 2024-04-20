"use client";

import axios from "axios";
import React,{useEffect, useState} from "react";

export const PostsContext=React.createContext();

const url=process.env.NEXT_PUBLIC_ROOT_URL;

const PostsContextProvider=({children})=>{
    const [posts,setPosts]=useState();

    const fetchAllPosts=async()=>{
        try {
            const res=await axios.get(url+"api/user/allposts");
            setPosts(res?.data?.posts);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      fetchAllPosts();
    }, [])
    
    return(
        <PostsContext.Provider value={{posts,fetchAllPosts}}>
            {children}
        </PostsContext.Provider>
    );
}

export default PostsContextProvider;