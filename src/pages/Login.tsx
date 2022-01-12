import { doc, setDoc } from "@firebase/firestore";
import { Facebook, GitHub, Google, Group, Twitter } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { Formik, Form, Field } from "formik";
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  auth,
  database,
  facebookAuthProvider,
  googleAuthProvider,
} from "../config/Firebase.config";
import { SignInUser } from "../config/FirebaseFunc";

export const Login = () => {
  const navigate = useNavigate();

  const initialValue = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email Required"),
    password: Yup.string().required("Password Required"),
  });

  const handleSubmit = async (values: any) => {
    console.log("submit");
    console.log(values);

    try {
      const res = await SignInUser(values);
      console.log(res);
      toast.success("login successfully");
      navigate("/");
    } catch (error: any) {
      console.log(error.code);
      if (error.code === "auth/wrong-password") {
        toast.error("Please check the Password");
      }
      if (error.code === "auth/user-not-found") {
        toast.error("Please check the Email");
      }
    }
  };

  const handlerGoogleSingIn = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        console.log(result);

        let Info = {
          id: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
          profilepic: result.user.photoURL,
        };
        localStorage.setItem("loginuser", JSON.stringify(Info));
        setDoc(doc(database, "loginUserGoogle", result.user.uid), Info)
          .then(() => {
            toast.success("login successfully");
            navigate("/");
          })
          .catch((error: any) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/wrong-password") {
          toast.error("Please check the Password");
        }
        if (error.code === "auth/user-not-found") {
          toast.error("Please check the Email");
        }
      });
  };

  const handlerFaceBookSingIn = () => {
    // facebookAuthProvider.addScope("email");
    signInWithPopup(auth, facebookAuthProvider)
      .then((result) => {
        console.log(result);

        let Info = {
          id: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
          profilepic: result.user.photoURL,
        };
        // localStorage.setItem("user-info", JSON.stringify(Info));
        // navigate("/");
        //
        localStorage.setItem("loginuser", JSON.stringify(Info));
        setDoc(doc(database, "loginUserfacebook", result.user.uid), Info)
          .then(() => {
            toast.success("login successfully");
            navigate("/");
          })
          .catch((error: any) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.code);
        if (error.code === "auth/wrong-password") {
          toast.error("Please check the Password");
        }
        if (error.code === "auth/user-not-found") {
          toast.error("Please check the Email");
        }
      });
  };

  const forgetPasswordHandler = () => {
    navigate("/forget");
  };

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        height={630}>
        <Formik
          initialValues={initialValue}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          {({ errors, isValid, touched, dirty }) => {
            return (
              <Form>
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    width: 600,
                  }}>
                  <Typography
                    variant="h3"
                    component={"h1"}
                    sx={{ textAlign: "center", m: 1 }}>
                    Log In
                  </Typography>
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}>
                    <Button
                      variant="contained"
                      startIcon={<Google />}
                      fullWidth
                      sx={{ m: 1 }}
                      onClick={handlerGoogleSingIn}>
                      Google
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<Facebook />}
                      fullWidth
                      sx={{ m: 1 }}
                      onClick={handlerFaceBookSingIn}>
                      Facebook
                    </Button>
                  </Box>
                  <Divider>
                    <Chip label="OR" />
                  </Divider>
                  <Field
                    as={TextField}
                    name="email"
                    type="email"
                    variant="standard"
                    placeholder="Enter Email"
                    label="Email"
                    sx={{ mb: 2 }}
                    error={Boolean(errors.email) && Boolean(touched.email)}
                    helperText={Boolean(touched.email) && errors.email}
                  />
                  <Field
                    as={TextField}
                    name="password"
                    type="password"
                    variant="standard"
                    placeholder="Enter Password"
                    label="Password"
                    sx={{ mb: 2 }}
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={Boolean(touched.password) && errors.password}
                  />
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    sx={{ my: 2 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      type="submit"
                      disabled={!isValid || !dirty}>
                      Submit
                    </Button>
                    <Button onClick={forgetPasswordHandler}>
                      Forget Password?
                    </Button>
                  </Box>
                  <Divider>
                    <Chip label="OR" />
                  </Divider>
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    sx={{ my: 2 }}>
                    <Typography component="p" sx={{ p: 1 }}>
                      Don't Have an Account
                    </Typography>
                    <Button component={Link} to="/signup" startIcon={<Group />}>
                      Sing up New Account
                    </Button>
                  </Box>
                </Paper>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </>
  );
};
