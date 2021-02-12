import React from "react"; 
import './App.css';
import Login from "./compoenents/Login";
import {Route} from "react-router-dom";
import User from "./compoenents/User";
function App() {
  return (
    <div >
      <Route path="/user/:email" component={User} />
      <Route path="/" exact component={Login} />
    </div>
  );
}

export default App;
