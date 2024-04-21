// API Requests

import axios from "axios";


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