



import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Typography,Button} from '@mui/material';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Admin() {
  const navigate=useNavigate();
  const [rows, setRows]= useState([]);
  useEffect(()=>{
    const users = JSON.parse(localStorage.getItem("storage"));
    const arr = [];
    for (let email in users) {
      arr.push({ email, ...users[email] });
    }
    console.log(arr);
    setRows(arr);
  },[]);

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

  return (
    
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
    </TableContainer>
    
  );
}