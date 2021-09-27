import React, { useState, useEffect, useContext, createContext } from "react";
import { supabase } from "./supabaseClient.js";

const UserContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    setLoading(false);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (evt, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  if (loading)
    return (
      <p className="m-4">
        Something <em>bad</em> happened . . .
      </p>
    );

  return (
    <UserContext.Provider value={{ user, session }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }

  console.log("useAuth:", context);

  return context;
};
