import React from "react";
import Login from './components/Login/Login';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Welcome() {
  return <h2 style={{textAlign:"center"}}>Welcome</h2>;
}


export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/signin">Signin</Link>
            </li>
            <li>
              <Link to="/welcome">Welcome</Link>
            </li>
          </ul>
        </nav>

        <Route path="/signin" exact component={Login} />
        <Route path="/welcome/" component={Welcome} />
      </div>
    </Router>
  );
};