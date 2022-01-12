import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import "./other/productstyle.css";
import { ToastContainer } from "react-toastify";
import { Forget } from "./pages/Forget";
import { FourZeroFourPage } from "./pages/404Page";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/Firebase.config";
import { getSingleData } from "./config/FirebaseFunc";
import { Cart } from "./pages/Cart";
import { PurchaseProduct } from "./pages/PurchaseProduct";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      getSingleData(user)
        .then((data: any) => {
          console.log(data.name);
          setUser(data.name);
        })
        .catch((error) => {
          setUser("");
        });
    });
  }, []);

  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About user={user} />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/cart" element={<Cart user={user} />} />
        <Route path="*" element={<FourZeroFourPage />} />
        <Route path="/purchaseitem" element={<PurchaseProduct user={user} />} />
      </Routes>
    </>
  );
}

export default App;
