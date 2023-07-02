"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onLogout = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/logout");
      console.log("Logout success ", response.data);
      toast.success("Logout Success"); // ! TODO: Configure this toast.
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message); // ! TODO: Configure this toast.
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <hr />
      <button
        disabled={loading}
        onClick={onLogout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
