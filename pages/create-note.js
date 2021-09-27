// pages/create-note.js

import React, { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { v4 } from "uuid";
import { supabase } from "../supabaseClient.js";
import "easymde/dist/easymde.min.css";

import { useAuth } from "../userContext.js";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const startingState = {
  title: "",
  content: "",
  id: null,
};

const CreateNote = () => {
  const [note, setNote] = useState(startingState);

  const router = useRouter();

  const { user } = useAuth();

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const createNew = async () => {
    if (!note.title) return;
    if (!note.content) return;

    note.id = v4();

    const { data } = await supabase
      .from("notes")
      .insert([
        {
          title: note.title,
          content: note.content,
          user_id: user.id,
          user_email: user.email,
        },
      ])
      .single();

    router.push(`/notes/${data.id}`);
  };

  return (
    <div>
      <h1 className="mt-6 text-3xl font-semibold tracking-wide">
        Create 1 note
      </h1>
      <input
        onChange={(e) => onChange(e)}
        name="title"
        placeholder="Title"
        value={note.title}
        className="border-b pb-2 text-lg my-4"
      />
      <SimpleMDE
        className="prose prose-lg max-w-none"
        value={note.content}
        onChange={(val) => setNote({ ...note, content: val })}
      />
      <button className="px-3 py-1 rounded-md bg-green-300" onClick={createNew}>
        Create me
      </button>
    </div>
  );
};

export default CreateNote;
