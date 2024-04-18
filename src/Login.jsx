import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button, TextField, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validate_name, setValidate_name] = useState(null);
  const [validate_email, setValidate_email] = useState(null);
  const [validate_password, setValidate_password] = useState(null);

  const checkUsername = () => {
    if (username === '') {
      setValidate_name("enter the username");
      return false;
    }
    return true;
  };
  const checkEmail = () => {
    const isEmailValid =
      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    if (email === '') {
      setValidate_email("Please enter email");
      return false;
    }
    if (!isEmailValid) {
      setValidate_email("Email is not valid");
      return false;
    }
    return true;
  };
  const checkPassword = () => {
    const isPwdValid =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if (password === '') {
      setValidate_password("Please enter password");
      return false;
    }
    if (!isPwdValid) {
      setValidate_password("Password is not valid");
      return false;
    }
    return true;
  };
  const handleButtonClick = () => {
    setValidate_name(null);
    setValidate_email(null);
    setValidate_password(null);
    const validUsername = checkUsername();
    const validEmail = checkEmail();
    const validPassword = checkPassword();
    if (validUsername && validEmail && validPassword) navigate("/home");
  };

  return (
    <Container sx={{ height: "100vh" }}>
      <Stack
        spacing={2}
        sx={{ height: "100%" }}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <Paper elevation={1} sx={{ width: '400px', padding: '20px' }}>
            <Stack direction="column" gap={2}>
              <Typography variant="h4" align="center">Sign in!</Typography>

              <TextField
                id="filled-basic"
                label="User Name"
                variant="filled"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
              {validate_name && (
                <Box >{validate_name}</Box>
              )}

              <TextField
                id="filled-basic"
                label="Email Id"
                variant="filled"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {validate_email && (
                <Box >{validate_email}</Box>
              )}

              <TextField
                id="filled-basic"
                label="Password"
                variant="filled"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {validate_password && (
                <Box >{validate_password}</Box>
              )}

              <Button
                variant="contained"
                onClick={handleButtonClick}
              >
                Submit
              </Button>


              <Button
                onClick={() => {
                  navigate("/signup");
                }}
              >
                New to MYF? Signup!
              </Button>
            </Stack>
          </Paper>
        </form>
      </Stack>
    </Container>
  );
}
