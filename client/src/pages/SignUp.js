import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid, Button, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { styled } from "@mui/material/styles";
import { CREATE_USER } from "../utils/mutations";
import { useMutation } from '@apollo/client';
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
    color="success"
    type="submit"
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

const SignUp = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [createUser, { error, data }] = useMutation(CREATE_USER);

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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    // use state for setting the open/close alert from material UI

    try {
      const { data } = await createUser({
        variables: { ...formState },
      });

      Auth.login(data.createUser.token);
    } catch (e) {
      console.error(e);
    }

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
        {/* {data ? (
          <p>
            Success! You may now head <Link to="/home">back to the homepage.</Link>
          </p>
        ) : ( */}
        <Grid item>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, minWidth: "30ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleFormSubmit}
          >
            <h2 style={{ color: "#fff" }}>Sign Up</h2>
            <div>
              <FormInput
                id="signup-username-input"
                label="Username"
                type="username"
                name="username"
                autoComplete="current-username"
                sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
                value={formState.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <FormInput
                id="signup-email-input"
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
                id="signup-password-input"
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
              <FormButton type="submit" onClick={handleClick}>Sign Up</FormButton>
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  Welcome! Your account has been created.
                </Alert>
              </Snackbar>
            </div>
          </Box>
        </Grid>
        {/* )}
         {error && ({error.message})} */}
      </Box>
    </Grid>
  );
};

export default SignUp;
