// pages/edit-note/[id].js

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { supabase } from "../../supabaseClient.js";

// import { useAuth } from "../../userContext";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const EditNote = () => {
  const [note, setNote] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  // const { user } = useAuth();

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchOne();

    const fetchOne = async () => {
      if (!id) return;
      const { data } = await supabase
        .from("notes")
        .select()
        .filter("id", "eq", id)
        .single();

      setNote(data);
    };
  }, [id]);

  const updateIt = async () => {
    if (!note.title) return;
    if (!note.content) return;

    const { data } = await supabase
      .from("notes")
      .update([
        {
          title: note.title,
          content: note.content,
        },
      ])
      .match({ id: id });

    router.push(`/my-notes/`);
  };

  if (!note) return null;

  return (
    <div>
      <h1 className="mt-6 text-3xl font-semibold tracking-wide">
        Update this note:
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
      <button className="px-3 py-1 rounded-md bg-green-100" onClick={updateIt}>
        Update me
      </button>
    </div>
  );
};

export default EditNote;
