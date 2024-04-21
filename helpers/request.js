// API Requests

import axios from "axios";


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