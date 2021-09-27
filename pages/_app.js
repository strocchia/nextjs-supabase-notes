// pages/_app.js

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient.js";

import "../styles/globals.css";

import { AuthProvider, useAuth } from "../userContext.js";

function MyNavbar() {
  const { user, session: sessStatus } = useAuth();

  return (
    <>
      <nav className="border-b p-6 border-gray-500">
        <Link href="/" passHref>
          <span className="mr-6 cursor-pointer">Home</span>
        </Link>
        {sessStatus?.user && (
          <Link href="/create-note" passHref>
            <span className="mr-6 cursor-pointer">Add-a-note</span>
          </Link>
        )}
        {sessStatus?.user && (
          <Link href="/my-notes" passHref>
            <span className="mr-6 cursor-pointer">My Notes</span>
          </Link>
        )}
        <Link href="/profile" passHref>
          <span className="mr-6 cursor-pointer">User Profile</span>
        </Link>
      </nav>
      {/* <div>
        <pre className="text-xs mx-6">
          <code>{JSON.stringify(sessStatus, null, 2)}</code>
        </pre>
      </div> */}
    </>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <AuthProvider>
        <MyNavbar />
        <div className="px-20 py-10">
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </div>
  );
}

export default MyApp;
