"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

export const UserContext=React.createContext();
const UserContextProvider=({children})=>{
    const [userData,setUserData]=useState();

    const fetchCurrentUser=async()=>{
        try {
            const res=await axios.get(process.env.NEXT_PUBLIC_ROOT_URL+"/api/user/profile")
            //console.log(res.data.user)
            setUserData(res.data.user)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCurrentUser();
    }, [])
    
    return(
        <UserContext.Provider value={{userData,fetchCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
