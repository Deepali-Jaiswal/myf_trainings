import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button,TextField,Container,Stack,Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repwd,setRepwd]=useState('');
  const [gender,setGender]=useState('');
  const [phone,setPhone]=useState('');
  const [validate_name, setValidate_name] = useState(null);
  const [validate_email, setValidate_email] = useState(null);
  const [validate_password, setValidate_password] = useState(null);
  const [validate_gender, setValidate_gender] = useState(null);
  const [validate_repwd, setValidate_repwd] = useState(null);
  const [validate_phone, setValidate_phone] = useState(null);

  const checkUsername = (username1) => {
    if (username1 === '') {
      setValidate_name("Please enter username");
      return false;
    }
    setValidate_name(null);
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
    setValidate_email('');
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
    setValidate_password(null);
    return true;
  };
  const recheckPassword=()=>{
    const isPwdValid =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if (password === '') {
      setValidate_repwd("Please enter password");
      return false;
    }
    if (!isPwdValid) {
      setValidate_repwd("Password is not valid");
      return false;
    }
    if(password!==repwd){
      setValidate_repwd("Password does not match with previous entered password");
      return false;
    }
    setValidate_repwd(null);
    return true;
  }
  const checkGender=()=>{
    if(gender==='')
    {
      setValidate_gender("enter the gender");
      return false;
    }
    if(gender!=='M' && gender!=='F')
    {
      setValidate_gender("enter either M or F");
      return false;
    }
    setValidate_gender(null);
    return true;
  }

  const checkPhone=()=>{
    if(phone.length!==10)
    {
      setValidate_phone("should contain 10 digits");
      return false;
    }
    setValidate_phone(null);
    return true;
  }
  const handleButtonClick = () => {
    setValidate_name(null);
    setValidate_email(null);
    setValidate_password(null);
    setValidate_gender(null);
    setValidate_repwd(null);
    setValidate_phone(null);
    const validUsername = checkUsername(username);
    const validEmail = checkEmail();
    const validPassword = checkPassword();
    const validRepwd=recheckPassword();
    const validGender=checkGender();
    const validPhone=checkPhone();

    if (validUsername && validEmail && validPassword && validRepwd && validGender && validPhone){
      
      navigate("/home");
    };
  };

  return (
    <Container sx={{ height: "150vh" }}>
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
              <Typography variant="h4" align="center">Sign UP!</Typography>
              <TextField sx={{backgroundColor:'white',mx:3,my:1,width:350}} id="name" label="User Name" variant="filled" onChange={(e)=>{setUsername(e.target.value); console.log(username);checkUsername(username);}}/>
              {validate_name && <Box sx={{color:'red',mx:3}}>{validate_name}</Box>}
              <TextField sx={{backgroundColor:'white',mx:3,my:1,width:350}} id="email" label="Email Id" variant="filled" onChange={(e)=>{setEmail(e.target.value);checkEmail();}}/>
              {validate_email && <Box sx={{color:'red',mx:3}}>{validate_email}</Box>}
              <TextField sx={{backgroundColor:'white',mx:3,my:1,width:350}} id="pwd" type="password" label="Password" variant="filled" onChange={(e)=>{setPassword(e.target.value);checkPassword();}}/>
              {validate_password && <Box sx={{color:'red',mx:3}}>{validate_password}</Box>}
              <TextField sx={{backgroundColor:'white',mx:3,my:1,width:350}} id="repwd" label="Renter Password" variant="filled" onChange={(e)=>{setRepwd(e.target.value);recheckPassword();}}/>
              {validate_repwd && <Box sx={{color:'red',mx:3}}>{validate_repwd}</Box>}
              <TextField sx={{backgroundColor:'white',mx:3,my:1,width:350}} id="gender" label="Gender-M/F" variant="filled" onChange={(e)=>{setGender(e.target.value);checkGender();}} />
              {validate_gender && <Box sx={{color:'red',mx:3}}>{validate_gender}</Box>}
              <TextField sx={{backgroundColor:'white',mx:3,my:1,width:350}} id="phone" label="Phone no." variant="filled" onChange={(e)=>{setPhone(e.target.value);checkPhone()}}/>
              {validate_phone && <Box sx={{color:'red',mx:3}}>{validate_phone}</Box>}
              <Button variant="contained" sx={{mx:12}} onClick={handleButtonClick}>Submit</Button>
              <Button
                onClick={() => {
                  navigate("/");
                }}
              >
                Move back to Sign In page!
              </Button>
            </Stack>
          </Paper>
        </form>
      </Stack>
    </Container>
  );
}

        