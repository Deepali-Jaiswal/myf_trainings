import {Box,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,TextField,Container,Stack,Typography,Radio,RadioGroup,FormLabel,FormControlLabel,FormHelperText} from '@mui/material';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {LogoutOutlined} from '@mui/icons-material';


export default function Admin() {
  const navigate=useNavigate();
  const [rows, setRows]= useState([]);
  const [newUser,setNewUser]=useState(false);
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
  useEffect(()=>{
    const users = JSON.parse(localStorage.getItem("storage"));
    const arr = [];
    for (let email in users) {
      arr.push({ email, ...users[email] });
    }
    console.log(arr);
    setRows(arr);
  },[]);

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
    else if(field==="email"){
      const isEmailValid =
      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(data);
    if (data === '') {
      setValidate_email("Please enter email");
      return false;
    }
    if (!isEmailValid) {
      setValidate_email("Email is not valid");
      return false;
    }
    setEmail(data)
    setValidate_email(null);
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
    const validEmail = validation(email,"email");
    const validPassword = validation(password,"password");
    const validRepwd=validation(repwd,"recheckPassword");
    const validGender=validation(gender,"gender");
    const validPhone=validation(phone,"phone");
    console.log(validUsername,validEmail,validPassword,validRepwd,validGender,validPhone);
    if (validUsername && validEmail && validPassword && validRepwd && validGender && validPhone){
      
      let users = JSON.parse(localStorage.getItem('storage')); 
      console.log(typeof(users));
      console.log(users);
      if(users===null)
      users={};

      if(users[email]){
        setValidate_email("Email already exists");
      }
      else{
        users[email]={username,email,password,gender,phone};
        console.log(users.email);
        localStorage.setItem("storage",JSON.stringify(users));
        console.log(users);
        const arr = [];
       for (let email in users) {
        arr.push({ email, ...users[email] });
       }
       console.log(arr);
      setRows(arr);
        navigate('/adminpanel');
        setNewUser(false);
      }
    };
  };

  const delDetails=(temp)=>{
    const users=JSON.parse(localStorage.getItem("storage"));
    delete users[temp];
    localStorage.setItem("storage",JSON.stringify(users));
    const arr = [];
    for (let email in users) {
      arr.push({ email, ...users[email] });
    }
    console.log(arr);
    setRows(arr);
    // console.log("deepali");
  }

  const editDetails=(text)=>{
    console.log(text);
    navigate("/editUser",{state:{email:text}})
  }
   
  const handleNewUser=()=>{
    setNewUser(true);
  }

  const handleNoNewUser=()=>{
    setNewUser(false);
  }

  const handleLogOut=()=>{
    navigate("/");
  }

  return (
    <>
      <Box text align="right" sx={{mx:2,my:1}}><Button onClick={handleLogOut}><LogoutOutlined/></Button></Box>
      <TableContainer component={Paper}>
      <Typography variant="h4" align="center">Admin Panel</Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email Id</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Phone Number</TableCell>
            <TableCell align="right">Delete</TableCell>
            <TableCell align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
              rows.map((row,index)=>(
                <TableRow
              key={row.email}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="right">{row.username}</TableCell>
              <TableCell align="right">{row.gender}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align ="right" >
              <Button variant="contained" color="error" onClick={()=>delDetails(row.email)}>Delete</Button>
              </TableCell>
              <TableCell  align ="right">
              <Button variant="contained" onClick={()=>editDetails(row.email)}>Edit</Button>
              </TableCell>
            </TableRow> 
              ))} 
        </TableBody>
      </Table>
      {!newUser &&< Box textAlign="right" sx={{mx:2,my:2}}><Button  variant="contained" onClick={handleNewUser}>Add new user</Button></Box>}
    </TableContainer>
      {newUser && 
      <Container sx={{}}>
      <Stack
        spacing={2}
        sx={{ height: "100%" }}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <form onSubmit={handleButtonClick} >
          <Paper elevation={1} sx={{ width: '400px', padding: '20px',my:4 }}>
            <Stack direction="column" gap={2}>
              <Typography variant="h4" align="center">Add new user</Typography>
              <TextField sx={{mx:3,my:1,width:350}} id="name" label="User Name*"  error={validate_name!==null} helperText={validate_name} onChange={(e)=>{validation(e.target.value,"name")}} />
              <TextField sx={{mx:3,my:1,width:350}} id="email" label="Email Id*"  error={validate_email!==null} helperText={validate_email} onChange={(e)=>{validation(e.target.value,"email");}}/>
              <TextField sx={{mx:3,my:1,width:350}} id="pwd" type="password" label="Password*" error={validate_password!==null} helperText={validate_password} onChange={(e)=>{validation(e.target.value,"password");}}/>
              <TextField sx={{mx:3,my:1,width:350}} id="repwd"  type="password" label="Renter Password*" error={validate_repwd!==null} helperText={validate_repwd} onChange={(e)=>{validation(e.target.value,"recheckPassword");}}/>
              <FormLabel sx={{mx:3,my:1,width:333,p:1}} variant="filled" id="demo-row-radio-buttons-group-label">Gender*</FormLabel>
                <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={gender}
                        variant="filled"
                        sx={{mx:3,my:-4,width:349}}
                        onChange={(e)=>{validation(e.target.value,"gender")}}
                >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
                <FormHelperText sx={{mx:3,my:1,width:350}}>{validate_gender}</FormHelperText>
              <TextField sx={{mx:3,my:1,width:350}} id="phone" label="Phone number*" error={validate_phone!==null} helperText={validate_phone} onChange={(e)=>{validation(e.target.value,"phone")}}/>
              
              <Button variant="contained" sx={{mx:12}} type="submit" onClick={handleButtonClick}>OK</Button>
              <Button variant="contained" sx={{mx:12}} type="submit" onClick={handleNoNewUser}>Don't want to add new User</Button>
            </Stack>
          </Paper>
        </form>
      </Stack>
    </Container>}
    </>
    
  );
}