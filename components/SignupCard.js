"use client";

import { useRef, useState } from "react";
import { FaCameraRetro } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";

const SignupCard = ({ handleSubmit, signupData, setSignupData, loading }) => {
  //to show Password Show or Hide icon
  const [showPassword, setShowPassword] = useState("Show");

  //to set input tag type of password
  const [inputType, setInputType] = useState("password");

  //to handle file upload
  const inputFileRef = useRef();

  //function to upload file when upload icon is clicked
  const handleProfilePic = () => {
    inputFileRef.current.click();
  };

  //function to show or hide password
  const handleShowHidePassword = () => {
    if (showPassword == "Show") {
      setInputType("text");
      setShowPassword("Hide");
    } else {
      setInputType("password");
      setShowPassword("Show");
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4 ">
        {/* User Email Input */}
        <div className="relative p-2 border rounded-sm">
          <input
            type="text"
            required
            className="w-full pt-1 text-xs focus:border-slate-400 focus:outline-none focus:align-bottom placeholder:text-base placeholder:text-slate-400 form-input"
            value={signupData.email}
            onChange={(e) => {
              setSignupData({ ...signupData, email: e.target.value });
            }}
          />

          {/* for email placeholder go to the top effect */}
          <span
            className={`absolute left-2 top-2 text-slate-400 placeholder-text  `}
          >
            Enter Email
          </span>
        </div>

        {/* user full name input    */}
        <div className="relative p-2 border rounded-sm">
          <input
            type="text"
            required
            className="w-full pt-1 text-xs focus:border-slate-400 focus:outline-none focus:align-bottom placeholder:text-base placeholder:text-slate-400 form-input"
            value={signupData.fullname}
            onChange={(e) =>
              setSignupData({ ...signupData, fullname: e.target.value })
            }
          />

          {/* for fullname placeholder go to the top effect */}
          <span
            className={`absolute left-2 top-2 text-slate-400 placeholder-text  `}
          >
            Full Name
          </span>
        </div>

        {/* username input */}
        <div className="relative p-2 border rounded-sm">
          <input
            type="text"
            required
            className="w-full pt-1 text-xs focus:border-slate-400 focus:outline-none focus:align-bottom placeholder:text-base placeholder:text-slate-400 form-input"
            value={signupData.username}
            onChange={(e) =>
              setSignupData({ ...signupData, username: e.target.value })
            }
          />

          {/* for username placeholder go to the top effect */}
          <span
            className={`absolute left-2 top-2 text-slate-400 placeholder-text  `}
          >
            User Name
          </span>
        </div>

        {/* User Password Input */}
        <div
          className={`relative p-2 border rounded-sm ${
            signupData.password !== "" &&
            "flex items-center justify-between gap-2"
          }`}
        >
          <input
            type={inputType}
            required
            className="w-full pt-1 text-xs focus:border-slate-400 focus:outline-none placeholder:text-slate-500 form-input"
            value={signupData.password}
            onChange={(e) => {
              setSignupData({ ...signupData, password: e.target.value });
            }}
          />

          {/* to show or hide password */}
          <span
            onClick={() => handleShowHidePassword()}
            className={`font-medium cursor-pointer ${
              signupData.password == "" && "hidden"
            }`}
          >
            {showPassword}
          </span>

          {/* for password placeholder go to the top effect */}
          <span
            className={`absolute left-2 top-2 text-slate-400 placeholder-text  `}
          >
            Enter Password
          </span>
        </div>

        {/* upload user profile pic */}
        <div onClick={() => handleProfilePic()} className="cursor-pointer">
          <input
            id="profilePic"
            type="file"
            className="hidden"
            ref={inputFileRef}
            onChange={(e) =>
              setSignupData({
                ...signupData,
                profilePic: e.target.files[0],
              })
            }
          />
          {Boolean(signupData.profilePic?.name) ? (
            <div className="p-1 border focus:border-slate-400  rounded-sm  flex items-center justify-start gap-6 hover:text-violet-500">
              <FaCameraRetro className="w-10 h-10" />
              <div className="font-medium text-slate-400">
                {signupData.profilePic?.name}
              </div>
            </div>
          ) : (
            <div className="p-1 border focus:border-slate-400  rounded-sm  flex items-center justify-start gap-6 hover:text-violet-500">
              <MdAddAPhoto className="w-10 h-10" />
              <div className="font-medium text-slate-400">
                Upload Profile Pic
              </div>
            </div>
          )}
        </div>

        {/* Signup Button */}
        <div>
          {loading ? (
            <div className="w-full p-2 rounded-lg bg-blue-300  text-white font-medium text-center">
              Creating your FakeInsta Account.....
            </div>
          ) : (
            <input
              type="submit"
              value="Sign up"
              className="w-full p-2 rounded-lg bg-blue-300 hover:bg-gradient-to-r from-pink-500 to-violet-500 text-white font-medium text-center "
            />
          )}
        </div>
      </form>
    </>
  );
};

export default SignupCard;
