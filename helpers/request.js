// API Requests

import axios from "axios";

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

        console.log(res);
        if(res.status){
            return res.data;
        }

    } catch (error) {
        console.log(error);
    }
}