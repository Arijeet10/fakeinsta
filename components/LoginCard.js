"use client";

import { useState } from "react";

const LoginCard = ({ handleSubmit, loginData, setLoginData }) => {


  //to show Password Show or Hide icon
  const [showPassword, setShowPassword] = useState("Show");

  //to set input tag type of password
  const [inputType,setInputType]=useState("password");

  //function to show or hide password
  const handleShowHidePassword = () => {
    if(showPassword=="Show"){
        setInputType("text")
        setShowPassword("Hide")
    }else{
        setInputType("password");
        setShowPassword("Show");
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-4 "
      >
        <div className=" flex flex-col gap-2">

          {/* User Email Input */}
          <div className="relative p-2 border rounded-sm">
            <input
              type="text"
              required
              className="w-full focus:mt-1 text-xs focus:border-slate-400 focus:outline-none focus:align-bottom placeholder:text-base placeholder:text-slate-400 form-input"
              value={loginData.email}
              onChange={(e) => {
                setLoginData({ ...loginData, email: e.target.value });
              }}
            />

            {/* for placeholder go to the top effect */}
            <span
              className={`absolute left-2 top-2 text-slate-400 placeholder-text  `}
            >
              Enter Email
            </span>
          </div>

          {/* User Password Input */}
          <div className={`relative p-2 border rounded-sm ${loginData.password!=="" && "flex items-center justify-between gap-2"}`}>
            <input
              type={inputType}
              required
              className="w-full focus:mt-1 text-xs focus:border-slate-400 focus:outline-none placeholder:text-slate-500 form-input"
              value={loginData.password}
              onChange={(e) => {
                setLoginData({ ...loginData, password: e.target.value });
              }}
            />

            {/* to show or hide password */}
            <span
                onClick={() => handleShowHidePassword()}
                className={`font-medium cursor-pointer ${loginData.password=="" && "hidden"}`}
              >
                {showPassword}
              </span>


            {/* for placeholder go to the top effect */}
            <span
              className={`absolute left-2 top-2 text-slate-400 placeholder-text  `}
            >
              Enter Password
            </span>

          </div>
        </div>

        {/* Login Button */}
        <div>
          <input
            type="submit"
            value="Log in"
            className="w-full p-2 rounded-lg bg-blue-300 hover:bg-gradient-to-r from-pink-500 to-violet-500 text-white font-medium "
          />
        </div>
      </form>
    </>
  );
};

export default LoginCard;
