// pages/index.js

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { supabase } from "../supabaseClient.js";

//import Head from "next/head";
//import Image from "next/image";
//import styles from "../styles/Home.module.css";

// import Auth from "./auth-component.js";
import { useAuth } from "../userContext.js";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    fetchNotes();

    const mySubscription = supabase
      .from("notes")
      .on("*", () => fetchNotes())
      .subscribe();

    return () => supabase.removeSubscription(mySubscription);
  }, []);

  const fetchNotes = async () => {
    const { data, error } = await supabase.from("notes").select("*");

    setNotes(data);
    setLoading(false);
  };

  if (isLoading) {
    return <div className="text-2xl">Loading ...</div>;
  }

  if (notes.length === 0) {
    return <div className="text-2xl">No notes to show</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-6">
        All notes
      </h1>
      {notes.map((note, idx) =>
        user ? (
          <Link key={idx} href={`/notes/${note.id}`} passHref>
            <div className="cursor-pointer border-b border-gray-300 mt-8 pb-4">
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p className="text-gray-500 mt-2">by: {note.user_email}</p>
            </div>
          </Link>
        ) : (
          <div key={idx}>
            <div className="border-b border-gray-400 mt-4 pb-2">
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p className="text-gray-500 mt-2">by: {note.user_email}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
