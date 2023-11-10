import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import Home from './components/Home/Home';
import Skifields from './components/Skifields/Skifields';
import Skifield from './components/Skifield/Skifield';
import Login from './components/Login/Login';
import Admin from './components/Admin/Admin';
import "./App.css"
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [favourites, setFavourites] = useState<string[]>([]);
  const [beenHere, setBeenHere] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAccessToken("");
    setUserId("");
    setFavourites([]);
    setBeenHere([]);
    navigate("/");
  };

  return (
    <div>
      <header>
        <Link to="/"> <img src="./logo.png" alt="Logo" className="logo" /> </Link>
        <nav className="nav">
          <Link to="/" className="a">Home</Link>
          <Link to="/skifields" className="a">Skifields</Link>
          {accessToken ? (
            <div>
              <Link to="/admin" className="a">Dashboard</Link>
              <button className="login-button" onClick={handleLogout}>Log Out</button>
            </div>
          ) : (
            <Link to="/login"><button className="login-button">Register / Login</button></Link>
          )}
        </nav>
      </header>
            <ToastContainer />
      <main>
        <Routes>
        <Route path="/" element={<Home userId={userId} token={accessToken} favourites={favourites} beenHere={beenHere} setFavourites={setFavourites} setBeenHere={setBeenHere} />} />
          <Route path="/skifields" element={<Skifields />} />
          <Route path="/skifield/:skifieldId" element={<Skifield userId={userId} token={accessToken} />} />
          <Route path="/login" element={<Login setToken={setAccessToken} setUserId={setUserId} />} />
          <Route path="/admin" element={<Admin token={accessToken} userId={userId} />} />
        </Routes>
      </main>
      </div>
  );
};

export default App;
