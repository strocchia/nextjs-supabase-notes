// pages/auth-component.js

import { useState, useEffect } from "react";
// import { useRouter } from "next/router";

import { supabase } from "../supabaseClient.js";

export default function AuthComponent() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("hi from useEffect");
    return () => {
      console.log("hi from cleanup");
      setLoading(false);
      setEmail("");
      setPassword("");
    };
  }, []);

  const handleLogin = async (email, password, mymethod) => {
    try {
      setLoading(true);

      if (mymethod === "LOGIN") {
        const { error, user } = await supabase.auth.signIn({
          email: email,
          password: password,
        });
        if (error) throw error;
        alert("You're in!");
      } else if (mymethod === "SIGNUP") {
        const { error, user } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (error) throw error;
        alert("Check email for login confirmation");
      }
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="border rounded w-1/3 p-12 mx-auto">
      <h3 className="text-xl">Ahoy, matey! </h3>
      <p className="text-gray-500 text-sm m-4">
        Fill in email, and either log in or register <br />
        ooh ... magic ...
      </p>
      <div>
        <input
          // className="mt-4 border w-full p-2 rounded focus:border-indigo-300"
          type="email"
          className="border w-full p-2 rounded-lg mt-4 focus:border-indigo-500"
          placeholder="Your email goes here"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          // className="mt-4 w-full bg-white border border-grey-400 p-2 rounded shadow"
          value={password}
          className="border w-full p-2 rounded-lg mt-4 focus:border-indigo-500"
          placeholder="Password, please"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex flex-col gap-2">
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email, password, "LOGIN");
            }}
            disabled={loading}
            className="bg-indigo-500 text-white w-full p-2 rounded-lg mt-8 hover:bg-indigo-300 hover:text-black disabled:opacity-10"
          >
            Lets go!
          </button>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email, password, "SIGNUP");
            }}
            className="bg-indigo-500 text-white w-full p-2 rounded-lg mt-2 hover:bg-indigo-700"
            disabled={loading}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
