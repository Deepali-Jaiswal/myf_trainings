import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import Home from "./Home";
import Admin from "./Admin";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/adminpanel" element={<Admin/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
