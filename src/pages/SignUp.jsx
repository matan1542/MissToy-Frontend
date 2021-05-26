import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import { userService } from "../services/user.service";

export default function SignUp({ ...props }) {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const validate = (values) => {
    console.log("MyForm ~ values", values);
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (values.password.length < 5) {
      errors.password = "too short pass";
    }
    return errors;
  };

  const onSubmit = (values, { setSubmitting }) => {
    console.log("submittes");
    const user = {
      fullname: values.firstName + " " + values.lastName,
      email: values.email,
      password: values.password,
    };

    setTimeout(async () => {
      setSubmitting(false);
      try {
        await props.signup(user);
        props.history.push("/toy");
      } catch (err) {
        console.log("Error in signUp", err);
      }
    }, 400);
  };
  const TextFieldOutlined = (props) => (
    <TextField {...props} variant="outlined" margin="normal" fullWidth />
  );
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          style={{
            margin: "10px",
            backgroundColor: "#3f51b5",
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          <Form
            style={{
              width: "100%",
              marginTop: "10px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  autoComplete="fname"
                  name="firstName"
                  id="firstName"
                  label="First Name"
                  as={TextFieldOutlined}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  as={TextFieldOutlined}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  as={TextFieldOutlined}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  as={TextFieldOutlined}
                />
                <ErrorMessage name="password" component="div" />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{
                marginTop: "10px",
              }}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}
