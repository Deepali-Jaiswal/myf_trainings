import {
  Button,
  TextField,
  Container,
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validate_name, setValidate_name] = useState(null);
  const [validate_email, setValidate_email] = useState(null);
  const [validate_password, setValidate_password] = useState(null);

  const generalisedChange = (data, field) => {
    if (field === "name") {
      if (data === "") {
        setValidate_name("Please enter username");
        return false;
      }
      setUsername(data);
      setValidate_name(null);
      return true;
    } else if (field === "email") {
      const isEmailValid =
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(data);
      if (data === "") {
        setValidate_email("Please enter email");
        return false;
      }
      if (!isEmailValid) {
        setValidate_email("Email is not valid");
        return false;
      }
      setEmail(data);
      setValidate_email(null);
      return true;
    } else if (field === "password") {
      const isPwdValid =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(data);
      if (data === "") {
        setValidate_password("Please enter password");
        return false;
      }
      if (!isPwdValid) {
        setValidate_password("Password is not valid");
        return false;
      }
      setPassword(data);
      setValidate_password(null);
      return true;
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    console.log(e);

    const validUsername = generalisedChange(username, "name");
    console.log(username, validUsername);
    const validEmail = generalisedChange(email, "email");
    console.log(email, validEmail);
    const validPassword = generalisedChange(password, "password");
    console.log(password, validPassword);

    console.log(validUsername, validEmail, validPassword);
    if (validUsername && validEmail && validPassword) {
      const users = JSON.parse(localStorage.getItem("storage")) || [];
      const curruser=users.filter((user)=> user.email===email);
      console.log(curruser);
      
      if (curruser.length===0) { 
        setValidate_email("Email is not registered!");
        setPassword("");   
      } 
      else if (users[0]['password'] !== password) {
        setValidate_password("Wrong Password!");
        setPassword("");
      } else {
        if (email === "admin@gmail.com") {
          navigate("/adminpanel");
        } else {
          navigate("/home", { state: { email } });
        }
      }
    }
  };

  return (
    <Container sx={{}}>
      <Stack
        spacing={2}
        sx={{ height: "100%" }}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <form onSubmit={handleButtonClick}>
          <Paper elevation={1} sx={{ my: 20, width: "400px", padding: "20px" }}>
            <Stack direction="column" gap={2}>
              <Typography variant="h4" align="center">
                Sign In Page!
              </Typography>
              <TextField
                sx={{ backgroundColor: "white", mx: 3, my: 1, width: 350 }}
                name="name"
                label="User Name"
                variant="filled"
                error={validate_name !== null}
                helperText={validate_name}
                onChange={(e) => {
                  generalisedChange(e.target.value, "name");
                }}
              />
              <TextField
                sx={{ backgroundColor: "white", mx: 3, my: 1, width: 350 }}
                id="email"
                label="Email Id"
                variant="filled"
                error={validate_email !== null}
                helperText={validate_email}
                onChange={(e) => {
                  generalisedChange(e.target.value, "email");
                }}
              />
              <TextField
                sx={{ backgroundColor: "white", mx: 3, my: 1, width: 350 }}
                id="pwd"
                type="password"
                label="Password"
                variant="filled"
                error={validate_password !== null}
                helperText={validate_password}
                onChange={(e) => {
                  generalisedChange(e.target.value, "password");
                }}
              />
              <Button variant="contained" sx={{ mx: 12 }} type="submit">
                Submit
              </Button>
              <Button
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Dont have an account? Sign Up!
              </Button>
            </Stack>
          </Paper>
        </form>
      </Stack>
    </Container>
  );
}
