import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button,TextField,Container} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function Login() {
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
    <form onSubmit={(e)=>e.preventDefault()}>
        <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          mx: 'auto',
          my:10,
          width: 400,
          height:450,
          backgroundColor:'grey',
        },
      }}
    >
      <Paper elevation={10}>
        <Box  sx={{mx:12,my:2,fontSize:25}}><p><center>SignIN!</center></p></Box>
        <TextField sx={{backgroundColor:'white',mx:3,my:1,width:350}} id="filled-basic" label="User Name" variant="filled" type="text" onChange={(e)=>setUsername(e.target.value)}/>
        {validate_name && <Box sx={{mx:3,color:'red'}}>{validate_name}</Box>}
        <TextField sx={{backgroundColor:'white',mx:3,my:1,width:350}} id="filled-basic" label="Email Id" variant="filled" type="email" onChange={(e)=>setEmail(e.target.value)}/>
        {validate_email && <Box sx={{mx:3,color:'red'}}>{validate_email}</Box>}
        <TextField sx={{backgroundColor:'white',mx:3,my:1,width:350}} id="filled-basic" label="Password" variant="filled" type="password" onChange={(e)=>setPassword(e.target.value)}/>
        {validate_password && <Box sx={{mx:3,color:'red'}}>{validate_password}</Box>}
        <center><Button variant="contained" sx={{mx:10,my:1}} onClick={handleButtonClick}>Submit</Button></center>
        <center><Button sx={{mx:4,color:'black'}} onClick={()=>{navigate('/signup')}}>New to MYF?Signup!</Button></center>
      </Paper>
    </Box>
    </form>
  );
}
