// pages/profile.js

import { supabase } from "../supabaseClient.js";

import React, { useState, useEffect } from "react";

import { useAuth } from "../userContext.js";

import AuthComponent from "./auth-component.js";

const Profile = ({ children }) => {
  const { user } = useAuth();

  console.log(user);

  if (user) {
    return (
      <>
        {/* <Text className="mr-2">Signed in as: {user.email}</Text>
        <Button type="primary" onClick={() => supabaseClient.auth.signOut()}>
          Sign out
        </Button> */}
        <p className="mb-4">
          Welcome, # <em>{user.id}</em>
        </p>
        <p className="mb-8">Signed in as: {user.email}</p>
        <button
          className="justify-right rounded-md bg-blue-200 text-sm p-2 hover:bg-blue-400 hover:text-white"
          onClick={(e) => {
            e.preventDefault();
            supabase.auth.signOut();
          }}
        >
          Sign out
        </button>
      </>
    );
  }

  return children;
};

const CustomProfile_Auth = () => {
  return (
    <Profile>
      <AuthComponent />
    </Profile>
  );
};

export default CustomProfile_Auth;
