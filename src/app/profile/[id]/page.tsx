import React from "react";

const UserProfile = ({ params }: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        User Profile Page{" "}
        <span className="p-2 ml-2 bg-orange-600 text-black rounded-lg">
          {params.id}
        </span>
      </p>
    </div>
  );
};

export default UserProfile;
