"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { IoPersonAdd } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

const People = () => {
  const [people, setPeople] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async function fetchPeople() {
      try {
        setLoading(true);
        const res = await axios.get("api/user/discover/");
        //console.log(res.data.people);
        if (res.status) {
          toast.success(res.data.message);
          setPeople(res.data.people);
          console.log(res.data.people);
        }
      } catch (error) {
        //console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <div className="p-4">
        <Toaster />
        <div className="py-4 text-3xl font-medium">Find People to Follow</div>
        {loading ? (
          <div>Loading....</div>
        ) : (
          <>
            {error ? (
              <div>Oops! Something went wrong ...</div>
            ) : (
              <>
                <div className="">
                  {people &&
                    people.map((data, index) => {
                      return (
                        <div key={index}>
                          <div className="py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <img
                                src={data?.profilePic}
                                alt="profile image"
                                className="h-20 w-20 rounded-full"
                              />
                              <div className=" text-lg font-medium">
                                {data?.fullname}
                              </div>
                            </div>
                            <div>
                              <IoPersonAdd className="w-10 h-10 hover:text-violet-500" />
                            </div>
                          </div>
                          <div className="border-t w-full" />
                        </div>
                      );
                    })}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default People;
