// pages/notes/[id].js

import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { supabase } from "../../supabaseClient";

const OneNote = ({ note }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (note) {
    return (
      <div>
        <h1 className="text-5xl mt-4 font-semibold tracking-wide">
          {note.title}
        </h1>
        <p className="text-sm font-light my-4">{note.user_email}</p>
        <div className="mt-8">
          <ReactMarkdown className="prose w-max-none">
            {note.content}
          </ReactMarkdown>
        </div>
      </div>
    );
  } else {
    return <p>No note</p>;
  }
};

export const getStaticProps = async ({ params }) => {
  const { data } = await supabase
    .from("notes")
    .select()
    .filter("id", "eq", params.id)
    .single();

  return {
    props: {
      note: data,
    },
  };
};

export const getStaticPaths = async () => {
  const { data } = await supabase.from("notes").select("id");
  const paths = data.map((note) => ({
    params: {
      id: JSON.stringify(note.id),
    },
  }));

  return {
    paths: paths,
    fallback: true,
  };
};

export default OneNote;
