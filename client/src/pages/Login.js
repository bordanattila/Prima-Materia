import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import { Grid, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

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

const Login = () => {
  return (
    <Grid
      container
      spacing={2}
      columns={12}
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
        <Grid item xs={12} sm={6}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
              borderColor: "teal",
            }}
            noValidate
            autoComplete="off"
          >
            <h2 style={{ color: "#fff" }}>Login</h2>
            <div>
              <FormInput
                id="login-email-input"
                label="Email"
                type="email"
                autoComplete="current-email"
                sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
              />
              <FormInput
                id="login-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
              />
              <Button variant="outlined">Login</Button>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <h2 style={{ color: "#fff" }}>Sign Up</h2>
            <div>
              <FormInput
                id="signup-username-input"
                label="Username"
                type="username"
                autoComplete="current-username"
                sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
              />
              <FormInput
                id="signup-email-input"
                label="Email"
                type="email"
                autoComplete="current-email"
                sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
              />
              <FormInput
                id="signup-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
              />
              <Button variant="outlined">Sign Up</Button>
            </div>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Login;
