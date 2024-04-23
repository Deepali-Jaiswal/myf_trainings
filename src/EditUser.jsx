
import Paper from '@mui/material/Paper';
import { Button,TextField,Container,Stack,Typography} from '@mui/material';
import { useNavigate,useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function EditUser() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repwd,setRepwd]=useState('');
  const [gender,setGender]=useState('');
  const [phone,setPhone]=useState('');

  const [validate_name, setValidate_name] = useState(null);
  // const [validate_email, setValidate_email] = useState(null);
  const [validate_password, setValidate_password] = useState(null);
  const [validate_gender, setValidate_gender] = useState(null);
  const [validate_repwd, setValidate_repwd] = useState(null);
  const [validate_phone, setValidate_phone] = useState(null);
  const location=useLocation();

  const validation=(data,field)=>{
    if(field==="name"){
      if (data === '') {
        setValidate_name("Please enter username");
        return false;
      }
      setUsername(data);
      setValidate_name(null);
      return true;
    }
    else if(field==="password"){
      const isPwdValid =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(data);
    if (data === '') {
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
    else if(field==="recheckPassword"){
      const isPwdValid =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(data);
    if (data === '') {
      setValidate_repwd("Please enter password");
      return false;
    }
    if (!isPwdValid) {
      setValidate_repwd("Password is not valid");
      return false;
    }
    if(password!==data){
      setValidate_repwd("Password does not match with previous entered password");
      return false;
    }
    setRepwd(data);
    setValidate_repwd(null);
    return true;
    }
    else if(field==="gender"){
      if(data==='')
    {
      setValidate_gender("enter the gender");
      return false;
    }
    if(data!=='M' && data!=='F')
    {
      setValidate_gender("enter either M or F");
      return false;
    }
    setGender(data);
    setValidate_gender(null);
    return true;
    }
    else{
      let x=data.length;
      if(data[x-1]>='0' && data[x-1]<='9')
      {
        setPhone(data);
      }
      else{
        setValidate_phone("entry shud contain only digits");
        return false;
      }
  
      if(x===10)
      {
        setValidate_phone(null);
        return true;
      }
      else
      {
        setValidate_phone('entry shud contain exactly 10 digits');
        return false;
      }
    }
  }

  
  const handleButtonClick = (e) => {
    e.preventDefault();
    console.log(e);
  
    const validUsername = validation(username,"name"); 
    const validPassword = validation(password,"password");
    const validRepwd=validation(repwd,"recheckPassword");
    const validGender=validation(gender,"gender");
    const validPhone=validation(phone,"phone");
    console.log(validUsername,validPassword,validRepwd,validGender,validPhone);
    if (validUsername  && validPassword && validRepwd && validGender && validPhone){
      
      const users = JSON.parse(localStorage.getItem('storage'));   
      const email=location.state.email; 
      console.log(email);

      users[email]={username, email,password,gender,phone};
      console.log(users);
      localStorage.setItem("storage",JSON.stringify(users));
      console.log(users);
      navigate("/");
    };
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
        <form onSubmit={handleButtonClick} >
          <Paper elevation={1} sx={{ width: '400px', padding: '20px' }}>
            <Stack direction="column" gap={2}>
              <Typography variant="h4" align="center">Edit your details</Typography>
              <TextField sx={{backgroundColor:'white',mx:3,my:1,width:350}} id="name" label="User Name" variant="filled" error={validate_name!==null} helperText={validate_name} onChange={(e)=>{validation(e.target.value,"name")}} />
              <TextField sx={{backgroundColor:'white',mx:3,my:1,width:350}} id="email" label="Email Id" variant="filled" value={location.state.email}/>
              <TextField sx={{backgroundColor:'white',mx:3,my:1,width:350}} id="pwd" type="password" label="Password" variant="filled" error={validate_password!==null} helperText={validate_password} onChange={(e)=>{validation(e.target.value,"password");}}/>
              <TextField sx={{backgroundColor:'white',mx:3,my:1,width:350}} id="repwd"  type="password" label="Renter Password" variant="filled" error={validate_repwd!==null} helperText={validate_repwd} onChange={(e)=>{validation(e.target.value,"recheckPassword");}}/>
              <TextField sx={{backgroundColor:'white',mx:3,my:1,width:350}} id="gender" label="Gender-M/F" variant="filled" error={validate_gender!==null} helperText={validate_gender} onChange={(e)=>{validation(e.target.value,"gender");}} />
              <TextField sx={{backgroundColor:'white',mx:3,my:1,width:350}} id="phone" label="Phone no." variant="filled" error={validate_phone!==null} helperText={validate_phone} onChange={(e)=>{validation(e.target.value,"phone")}}/>
              <Button variant="contained" sx={{mx:12}} type="submit">Submit</Button>
              <Button onClick={() => { navigate("/"); }}>Move back to Sign In page!</Button>
            </Stack>
          </Paper>
        </form>
      </Stack>
    </Container>
  );
}

        