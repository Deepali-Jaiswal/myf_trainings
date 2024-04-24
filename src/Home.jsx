import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Typography,Button} from '@mui/material';
import { useEffect,useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

export default function Home() {
  const location=useLocation();
  const navigate=useNavigate();
  const temp=location.state.email;
  const [detailUser,setDetailUser]=useState({});

  useEffect(()=>{
  const storage=JSON.parse(localStorage.getItem("storage"));
  console.log(storage);
  setDetailUser(storage[temp]);
  console.log("humara naya data");
  console.log(detailUser);
  },[]);

  const editDetails=()=>{
    navigate("/edituser",{state:{email:location.state.email}});
  }

  const deleteDetails=()=>{
    const storage=JSON.parse(localStorage.getItem("storage"));
    const temp=location.state.email;
    delete storage[temp];
    localStorage.setItem("storage",JSON.stringify(storage));
    setDetailUser(null);
  }

  return (
    
    <TableContainer component={Paper}>
      <Typography variant="h4" align="right" sx={{mx:5}}>
        <Button variant="contained" onClick={()=>navigate('/')}>Logout</Button>
      </Typography>
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
            {detailUser &&
            <TableRow
            key={detailUser.email}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {detailUser.email}
            </TableCell>
            <TableCell align="right">{detailUser.username}</TableCell>
            <TableCell align="right">{detailUser.gender}</TableCell>
            <TableCell align="right">{detailUser.phone}</TableCell>
            <TableCell align ="right" >
            <Button variant="contained" color="error" onClick={deleteDetails}>Delete</Button>
            </TableCell>
            <TableCell  align ="right">
            <Button variant="contained" onClick={editDetails}>Edit</Button>
            </TableCell>
          </TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
    
  );
}