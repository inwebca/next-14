"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/app/config/firebase";
import { setCookie, deleteCookie } from "cookies-next"; // For cookie management

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setCookie("authToken", token, { maxAge: 3600 });
        setUser(user);
      } else {
        setUser(null);
        deleteCookie("authToken");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    const currentUser = auth.currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken();
      setCookie("authToken", token, { maxAge: 3600 }); // Set the token in a cookie after login
    }
  };

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
    const currentUser = auth.currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken();
      setCookie("authToken", token, { maxAge: 3600 });
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
    deleteCookie("authToken"); // Remove the cookie on sign-out
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signOutUser }}
    >
      {!loading ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
};
