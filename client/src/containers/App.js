import React from 'react';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import Home from './Home/Home';
import './App.css'

import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  return (
    <div className="container">
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={LoginForm} />
        <Route path="/register" exact component={RegisterForm} />
      </Router>
    </div>

  );
}

export default App;
