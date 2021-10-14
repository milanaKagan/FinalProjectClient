import axios from 'axios';
import React from 'react';
import './HeaderStyle.css';

const Header = ({dataParentToChild}) => {
  const handleLogout = (event) => {
    axios.get('http://localhost:8080/logout',{ withCredentials: true }).then((respone) =>{})
    .catch((error) =>{
      console.log(error)
    });
  }
  return (
<div className="header">
    <div className="menue-flight">
    <h2 className="logo">FlightBook</h2>
    <a href="http://localhost:3001/flights" className="flight-option menue-link">Flights</a>
    <a href="/"  className="flight-option menue-link">Home</a>
    {(dataParentToChild == '') ?   null: <a href="http://localhost:3001/airlines" className="flight-option menue-link">Airlines</a>}
    {(dataParentToChild == '') ?   null: <a href="http://localhost:3001/users" className="flight-option menue-link">Users</a>}
    {(dataParentToChild == '') ?   null: <a href="http://localhost:3001/customers" className="flight-option menue-link">Customers</a>}
    </div>
    <div className="menue-register">
    { (dataParentToChild == '') ? null 
    : <span className="login-option">Welcome, {dataParentToChild.data.user}</span> }

    {(dataParentToChild == '') ?   <a href="http://localhost:3001/login" className="login-option auth-link">Login</a> : null}
    {(dataParentToChild == '') ?   <a href="http://localhost:3001/signup" className="login-option auth-link">Sign Up</a> : null}
    {(dataParentToChild == '') ?   null : <a href="http://localhost:3001/login" className="login-option auth-link" onClick={handleLogout}>Log out</a>}
    </div>
</div>
  );
}

export default  Header;

