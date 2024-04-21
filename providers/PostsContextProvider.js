"use client";

import axios from "axios";
import React,{useEffect, useState} from "react";

export const PostsContext=React.createContext();

const url=process.env.NEXT_PUBLIC_ROOT_URL;

const PostsContextProvider=({children})=>{
    const [posts,setPosts]=useState();
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false);

    const fetchAllPosts=async()=>{
        try {
            setLoading(true);
            const res=await axios.get(url+"api/posts/allposts");
            setPosts(res?.data?.posts);
        } catch (error) {
            console.log(error);
            setError(true);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
      fetchAllPosts();
    }, [])
    
    return(
        <PostsContext.Provider value={{posts,fetchAllPosts,loading,error}}>
            {children}
        </PostsContext.Provider>
    );
}

export default PostsContextProvider;