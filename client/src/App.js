import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Home from './pages/Home/Home'
import Menu from './pages/Menu/Menu'
import FoodItems from './pages/FoodItems/FoodItems'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/Login'
import Cart from './pages/Cart/Cart'
import OrdersList from './pages/Order/order'
import axios from 'axios';
import { getCookie, removeCookie } from './cookie'
import jwt_decode from 'jwt-decode';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate()

  const HandleLoginSubmit = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', { email, password });
      // console.log(response.data.accessToken)
      document.cookie = `access_token=${response.data.accessToken}`;
     
      setUsername(response.data.name);
      setLoggedIn(true);
      alert('Login successful');
      navigate('/')

    } catch (error) {
      alert(`Login failed: Invalid Credentials ${error.message}`);
    }
  };

  useEffect(() => {
    const accessToken = getCookie("access_token");

    if (accessToken) {
      const decoded = jwt_decode(accessToken);
      const name = decoded.name;
      setLoggedIn(true);
      setUsername(name);
    }
  }, []);

  const handleLogout = () => {
    removeCookie("access_token");
    setLoggedIn(false);
    setUsername("")
    window.location.reload();
  };

  return (
    <div>
      <Navbar loggedIn={loggedIn} username={username} handleLogout={handleLogout} />
      
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/fooditems" element={<FoodItems />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login HandleLoginSubmit={HandleLoginSubmit} />} />
            <Route path='/cart' element={<Cart />} />
            {/* <Route path='/orders' /> */}
            <Route path='/orders' element={<OrdersList />}/>

        </Routes>
      <Footer />
    </div>
  );
}

export default App;
