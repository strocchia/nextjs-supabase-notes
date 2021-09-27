// pages/my-notes.js

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { supabase } from "../supabaseClient.js";
import { useAuth } from "../userContext.js";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    fetchNotes();

    const fetchNotes = async () => {
      const { data } = await supabase
        .from("notes")
        .select("*")
        .filter("user_id", "eq", user.id);

      setNotes(data);
      setLoading(false);
    };
  }, [user]);

  const deleteNote = async (id) => {
    if (confirm("Are you sure?")) {
      await supabase.from("notes").delete().match({ id: id });

      // re-fetch notes from server
      const { data } = await supabase
        .from("notes")
        .select("*")
        .filter("user_id", "eq", user.id);

      setNotes(data);
    }
  };

  if (isLoading) {
    return <div className="text-2xl">Loading ...</div>;
  }

  if (!notes || notes.length === 0) {
    return <div className="text-2xl">No notes to show</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
        My notes
      </h1>
      {notes.map((note, idx) => (
        <div key={idx} className=" border-b border-gray-300 mt-8 pb-4">
          <h2 className="text-xl font-semibold">{note.title}</h2>
          <p className="text-gray-500 mt-2 mb-1">by: {note.user_email}</p>
          <Link href={`/edit-note/${note.id}`} passHref>
            <a className="text-blue-500 mr-4">Edit</a>
          </Link>
          <Link href={`/notes/${note.id}`} passHref>
            <a className="text-blue-500 mr-4">View</a>
          </Link>
          <button
            className="text-sm text-red-700 mr-4"
            onClick={() => deleteNote(note.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyNotes;
