// API Requests

import axios from "axios";
import { NextResponse } from "next/server";

const url=process.env.NEXT_PUBLIC_ROOT_URL;

// get posts of particular profile from api
export async function getUserPosts(id){
    const payload={
        profileID:id,
    }
    try {
        const res=await axios.post("/api/posts/profile/",payload);
        //console.log(res)
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

//logout user
export async function logoutUser(){
    try {
        const res=await axios.get("/api/logout/");
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

//delete a post
export async function deletePost(postID){

    try {
        const payload={
            postID,
        }
        console.log(payload)
        const res=await fetch(url+"api/posts/delete",{
            method:"DELETE",
            headers:{
                accept:"application/json"
            },
            body:JSON.stringify(payload)
        });
        if(res.ok){
            const response=await res.json();
            console.log(response);
            return response.message
        }
        if(res.status){
            return res.data;
        }

    } catch (error) {
        return NextResponse.json("Delete Error:",error);
    }
}