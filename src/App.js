import React from 'react';
import './App.css';
import SignUp from './components/SignUp';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';

function App() {
  return (
    <div>
      <NavBar/>
      <SignUp />
      <Home />
    </div>
  )
}

export default App;
