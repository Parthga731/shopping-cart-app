import { doc, setDoc } from "@firebase/firestore";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { auth, database } from "../config/Firebase.config";

export const Signup = () => {
  const navigate = useNavigate();

  const RadioOptions = [
    { key: "Email", value: "emailmoc" },
    { key: "Telephone", value: "telephonemoc" },
  ];
  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    modeOfContact: "",
    phoneNumber: "",
  };

  const validationSchema = Yup.object({
    fullname: Yup.string().required("fullName Required! ").min(8).max(20),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email Required"),
    password: Yup.string().required("Password Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm Password Required"),
    modeOfContact: Yup.string().required("please choose mode of contact"),
    phoneNumber: Yup.string().when("modeOfContact", {
      is: "telephonemoc",
      then: Yup.string().required("PhoneNo Required").min(10).max(10),
    }),
  });

  const handleSubmit = async (values: any) => {
    console.log("submit");
    console.log(values);

    const { fullname, email, phoneNumber, password, confirmPassword } = values;
    // createUserByFirebase(values);
    if (password !== confirmPassword) {
      return toast.error("password not match");
    }
    if (fullname && email && password) {
      try {
        let res = await createUserWithEmailAndPassword(auth, email, password);
        console.log(res);

        let info = {
          id: res.user.uid,
          name: fullname,
          email: res.user.email,
          profilepic: res.user.photoURL,
          phoneNumber: phoneNumber,
          creationTime: res.user.metadata.creationTime,
          lastSignInTime: res.user.metadata.lastSignInTime,
          // token: res._tokenResponse.refreshToken,
        };
        localStorage.setItem("user-info", JSON.stringify(info));
        setDoc(doc(database, "SignedUpUsersData", res.user.uid), info)
          .then(() => {
            toast.success("account create successfully");
            navigate("/login");
          })
          .catch((error: any) => {
            toast.error(error.message);
          });
      } catch (error: any) {
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email Already in Use");
        }
      }
    } else {
      return toast.error("text field can not empty");
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        height={620}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          {({ errors, isValid, touched, dirty }) => {
            return (
              <Form>
                <Paper
                  elevation={5}
                  sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    width: 600,
                  }}>
                  <Typography
                    variant="h3"
                    component={"h1"}
                    sx={{ textAlign: "center" }}>
                    Sing Up
                  </Typography>
                  <Divider sx={{ my: 3 }} />
                  <Field
                    as={TextField}
                    type="text"
                    variant="standard"
                    name="fullname"
                    placeholder="Enter Name"
                    label="Full Name"
                    sx={{ mb: 2 }}
                    error={
                      Boolean(touched.fullname) && Boolean(errors.fullname)
                    }
                    helperText={Boolean(touched.fullname) && errors.fullname}
                  />
                  <Field
                    as={TextField}
                    type="email"
                    variant="standard"
                    placeholder="Enter Email"
                    name="email"
                    label="Email"
                    sx={{ mb: 2 }}
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={Boolean(touched.email) && errors.email}
                  />
                  <Field
                    as={TextField}
                    type="password"
                    variant="standard"
                    placeholder="Enter Password"
                    label="Password"
                    name="password"
                    sx={{ mb: 2 }}
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={Boolean(touched.password) && errors.password}
                  />
                  <Field
                    as={TextField}
                    type="password"
                    variant="standard"
                    placeholder="Enter Confirm Password"
                    label="Confirm Password"
                    name="confirmPassword"
                    sx={{ mb: 2 }}
                    error={
                      Boolean(touched.confirmPassword) &&
                      Boolean(errors.confirmPassword)
                    }
                    helperText={
                      Boolean(touched.confirmPassword) && errors.confirmPassword
                    }
                  />
                  <FormControl
                    component="fieldset"
                    error={
                      Boolean(touched.modeOfContact) &&
                      Boolean(errors.modeOfContact)
                    }>
                    <FormLabel component="legend">Mode of contact</FormLabel>
                    <Field as={RadioGroup} row name="modeOfContact">
                      {RadioOptions.map((option, id) => {
                        return (
                          <FormControlLabel
                            key={id}
                            value={option.value}
                            control={<Radio />}
                            label={option.key}
                          />
                        );
                      })}
                    </Field>
                    <FormHelperText sx={{ color: "red" }}>
                      {errors.modeOfContact}
                    </FormHelperText>
                  </FormControl>
                  <Field
                    as={TextField}
                    type="number"
                    name="phoneNumber"
                    variant="standard"
                    placeholder="Enter Phone No"
                    label="Phone No"
                    error={
                      Boolean(touched.phoneNumber) &&
                      Boolean(errors.phoneNumber)
                    }
                    helperText={
                      Boolean(touched.phoneNumber) && errors.phoneNumber
                    }
                  />
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={{ my: 3 }}
                      disabled={!isValid || !dirty}>
                      Submit
                    </Button>
                    <Button
                      variant="text"
                      component={Link}
                      to="/login"
                      sx={{ my: 3 }}>
                      Go Back
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
