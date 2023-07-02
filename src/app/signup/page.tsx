"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success ", response.data);
      // ! TODO: configure react toast message properly
      toast.success("Signup Successful");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup Failed! ", error.message);
      // ! TODO: configure react toast message properly
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl text-white">
        {loading ? "Processing your data...." : "Signup"}
      </h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-slate-700"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-slate-700"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-slate-700"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onSignup}
        disabled={buttonDisabled || loading}
        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "Give Me Data" : "Signup"}
        {loading && (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></span>
        )}
      </button>
      <Link href="/login">Visit Login page</Link>
    </div>
  );
};

export default SignupPage;
