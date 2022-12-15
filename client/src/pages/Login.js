import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Grid, Button, Link, TextField, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { styled } from "@mui/material/styles";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from "../utils/mutations";
import Auth from '../utils/auth';

const FormInput = styled(TextField)({
  "& label.Mui-focused": {
    color: "#fff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "teal",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "teal",
    },
    "&:hover fieldset": {
      borderColor: "teal",
    },
    "&.Mui-focused fieldset": {
      borderColor: "teal",
    },
  },
});

const FormButton = (props) => (
  <Button
    variant="contained"
    type="submit"
    color="success"
    sx={{
      padding: 1,
      borderColor: "teal",
      color: "#fff",
      margin: "8px",
    }}
  >
    {props.children}
  </Button>
);

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // setting up the Alert object
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "70vh" }}
    >
      <Box
        sx={{
          display: "flex",
          color: "#fff",
        }}
      >
        <Grid item>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
              borderColor: "teal",
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleFormSubmit}
          >
            <h2 style={{ color: "#fff" }}>Login</h2>
            <div>
              <FormInput
                id="login-email-input"
                label="Email"
                type="email"
                name="email"
                autoComplete="current-email"
                sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
                value={formState.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <FormInput
                id="login-password-input"
                label="Password"
                type="password"
                name="password"
                autoComplete="current-password"
                sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
                value={formState.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <FormButton type="submit" onClick={handleClick}>Login</FormButton>
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  Login Successful!
                </Alert>
              </Snackbar>
            </div>
            <div>
              <br></br>
              <Link href="/signup" underline="none">
                {"Click here to sign up"}
              </Link>
            </div>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Login;
