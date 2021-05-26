import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Formik, Form, Field, ErrorMessage } from "formik";

export function Login({ ...props }) {
  console.log(props);
  const initialValues = { email: "", password: "" };

  const validate = (values) => {
    // console.log("MyForm ~ values", values);
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

    setTimeout(() => {
      setSubmitting(false);
      props
        .login(values)
        .then(() => {
          props.history.push("/toy");
        })
        .catch((err) => {
          console.log(err);
        });
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
          Sign in
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
            <Field
              type="email"
              label="Email"
              name="email"
              autoComplete="email"
              as={TextFieldOutlined}
            />
            <ErrorMessage name="email" component="div" />
            <Field
              type="password"
              name="password"
              label="password"
              autoComplete="password"
              as={TextFieldOutlined}
            />
            <ErrorMessage name="password" component="div" />
            <Button
              type="submit"
              fullWidth
              color="primary"
              variant="contained"
              style={{
                marginTop: "10px",
              }}
            >
              Sign In
            </Button>
          </Form>
        </Formik>

        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
