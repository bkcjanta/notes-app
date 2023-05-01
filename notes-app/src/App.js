import './App.css';
import { getDatabase } from 'firebase/database';
import { app, database, auth } from './firebase';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { Navbar } from './components/Navbar';


function App() {
  const user = useAuth()
  console.log(user)

  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/dashboard' element />
      </Routes>
    </div>
  );
}

export default App;
