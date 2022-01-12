import { Box, Button, TextField, Typography } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../config/Firebase.config";

export const Forget = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (email) {
      sendPasswordResetEmail(auth, email, {
        url: "http://localhost:3000/login",
      })
        .then(() => {
          toast.success("Email Send successfully", {
            position: "top-center",
            autoClose: 5000,
          });
          navigate("/login");
        })
        .catch((error) => {
          console.log(error.code);
          if (error.code === "auth/user-not-found") {
            return toast.error("Please check the Email", {
              position: "top-center",
              autoClose: 5000,
            });
          }
          if (error.code === "auth/missing-email") {
            return toast.error("Please Enter Your email address", {
              position: "top-center",
              autoClose: 5000,
            });
          }
        });
    } else {
      return toast.error("Email cannot empty", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          p={5}>
          <Typography
            // sx={{ textAlign: "center", py: 5 }}
            component={"h2"}
            variant="h5">
            Forget Password
          </Typography>
          <TextField
            id="email"
            label="Email"
            value={email}
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" color="secondary" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};
