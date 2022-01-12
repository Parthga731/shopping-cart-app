import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { auth } from "../config/Firebase.config";

export const About = ({ user }: any) => {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, []);

  return (
    <div>
      <Header user={user} />
      <h1>About Page</h1>
    </div>
  );
};
