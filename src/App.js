import './App.css';
import SignUp from './components/Forms/SignUp'
import Login from './components/Forms/Login'
import AddAirlne from './components/Forms/AddAirlne'
import AddFlight from './components/Forms/AddFlight'
import Header from './components/header/Header'
import HomePage from './components/pages/HomePage'
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import React, { useState } from 'react'


const App = () => {
  const [loginRes, setLoginRes] = useState('');
  const handleLoginCallback = (childData) => {
    setLoginRes(childData)

  }
  return (
    <div className="App">
          
      <Header dataParentToChild = {loginRes}/>
      <div className="main">
      <Router>
      <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
          {(loginRes == '')? <Login parentCallback = {handleLoginCallback}/> : <HomePage />}
          </Route>
          <Route path="/signup">
          {(loginRes == '')? <SignUp parentCallback = {handleLoginCallback}/> : <HomePage />}
          </Route>
      </Switch>
      </Router>
      </div>
    </div>
  );
};

export default App;