import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute'

import Login from "./components/Login";
import BubblePage from './components/BubblePage'
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute path='/bubbles' component={BubblePage} />
        <ul style={{listStyleType:'none', textAlign:'left', marginRight:'10px'}}>
          <li>
            <Link to='/' style={{textDecoration:'none', color:'black', }}>
            Login
            </Link>
          </li>
          <br />
          <li>
            <Link to='/bubbles' style={{textDecoration:'none', color:'black'}}>
            Bubble Page
            </Link>
          </li>
        </ul>
      </div>
    </Router>
  );
}

export default App;
