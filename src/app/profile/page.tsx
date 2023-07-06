"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProfilePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    _id: "",
    username: "",
    email: "",
    isAdmin: "",
    isVerified: "",
  });

  const onLogout = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/logout");
      console.log("Logout success ", response.data);
      toast.success("Logout Success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/profile");
    console.log(response.data);
    setData(response.data.data);
    console.log(data);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div>
        <Toaster />
      </div>
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2>
        {data._id ? (
          <Link href={`/profile/${data._id}`}>Hello {data.username}</Link>
        ) : (
          "Nothing"
        )}
      </h2>
      <hr />
      {data._id && (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{data.username}</div>
            <p className="text-slate-500 text-base">{data.email}</p>
            <p className="text-gray-500 text-base">{data._id}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {data.isAdmin ? "Admin" : "Not Admin"}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {data.isVerified ? "Verified User" : "Not Verified"}
            </span>
          </div>
        </div>
      )}
      <hr />
      <button
        disabled={loading}
        onClick={onLogout}
        className="bg-blue-600 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
