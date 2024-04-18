import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button,TextField} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Signup() {

  const navigate=useNavigate();
  const [username,setUsername]=useState(null);
  const [email,setEmail]=useState(null);
  const [password,setPassword]=useState(null);
  const [validate_name,setValidate_name]=useState(null);
  const [validate_email,setValidate_email]=useState(null);
  const [validate_password,setValidate_password]=useState(null);

  const checkUsername=()=>{
    if(username===null)
    {
      setValidate_name("enter the username");
      return false;
    }
    return true;
  }
  const checkEmail=()=>{
    const isEmailValid=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    if(email===null)
    {
      setValidate_email("Please enter email");
      return false;
    }
    if(!isEmailValid)
    {
      setValidate_email("Email is not valid");
      return false;
    }
    return true;
  }
  const checkPassword=()=>{
    const isPwdValid=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if(password===null)
    {
      setValidate_password("Please enter password");
      return false;
    }
    if(!isPwdValid)
    {
      setValidate_password("Password is not valid");
      return false;
    }
    return true;
  }
  const handleButtonClick=()=>{
    setValidate_name(null);
    setValidate_email(null);
    setValidate_password(null);
    const x=checkUsername();
    const y=checkEmail();
    const z=checkPassword();
    if(x&&y&&z)
    navigate('/home');
  }
  return (
    <form>
      <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          mx: 'auto',
          my:10,
          width: 400,
          height:700,
          backgroundColor:'pink',
        },
      }}
    >
      <Paper elevation={10}>
        <Box  sx={{mx:8,my:2,fontSize:25}}><p>Signup page!</p></Box>
        <TextField sx={{backgroundColor:'white',mx:3,my:1,width:350}} id="filled-basic" label="User Name" variant="filled" />
        <TextField sx={{backgroundColor:'white',mx:3,my:1,width:350}} id="filled-basic" label="Email Id" variant="filled" />
        <TextField sx={{backgroundColor:'white',mx:3,my:1,width:350}} id="filled-basic" label="Password" variant="filled" />
        <TextField sx={{backgroundColor:'white',mx:3,my:1,width:350}} id="filled-basic" label="Renter Password" variant="filled" />
        <TextField sx={{backgroundColor:'white',mx:3,my:1,width:350}} id="filled-basic" label="Gender" variant="filled" />
        <TextField sx={{backgroundColor:'white',mx:3,my:1,width:350}} id="filled-basic" label="Phone no." variant="filled" />
        <Button variant="contained" sx={{mx:12}} onClick={handleButtonClick}>Submit</Button>
      </Paper>
    </Box>
    </form>
  );
}