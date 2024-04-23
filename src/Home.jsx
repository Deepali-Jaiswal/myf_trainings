
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Typography,Button} from '@mui/material';
import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';


export default function Home() {
  const location=useLocation();
  const temp=location.state.email
  const [detailUser,setDetailUser]=useState([]);
  useEffect(()=>{
  const storage=JSON.parse(localStorage.getItem("storage")) || [];
  setDetailUser(storage.filter((user)=> user['email']===temp) ) 
  },[]);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" align="center">User</Typography>
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
          {detailUser.map((row) => (
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
              <TableCell>
              <Button variant="contained" align ="right" color="error">Delete</Button>
              </TableCell>
              <TableCell>
              <Button variant="contained" align ="right">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}