import axios from 'axios';
import React from 'react';
import './HeaderStyle.css';


const Header = ({dataParentToChild}) => {
  console.log(dataParentToChild.data)
  const handleLogout = (event) => {
    axios.get('http://localhost:8080/logout',{ withCredentials: true }).then((respone) =>{})
    .catch((error) =>{
      console.log(error)
    });
  }
const verifyCustomerexists =  () => {
  axios.get(`http://localhost:8080/customer/customers/user/${dataParentToChild.data.user}`).then((response) => {
    console.log("customer by userNmae: " + response);
    return response;
  }).catch((error) =>{
    console.log(error)
    return null;
    
  });
  
}

  return (
<div className="header">
    <div className="menue-flight">
    <h2 className="logo">FlightBook</h2>
    <a href="/"  className="flight-option menue-link">Home</a>
    {(dataParentToChild == '') ?   null: 
    (dataParentToChild.data.role.toLowerCase() == 'customer') ? 
       <div>
      {(verifyCustomerexists() != null) ? 
      <a href="http://localhost:3001/edit-customer" className="flight-option menue-link">Edit Customer</a> :
      <a href="http://localhost:3001/add-customer" className="flight-option menue-link">Add Customer</a>}
         <a href="http://localhost:3001/view-tickets" className="flight-option menue-link">View Tickets</a>
         <a href="http://localhost:3001/order-tickets" className="flight-option menue-link">Order Tickets</a>
       </div> :(dataParentToChild.data.role.toLowerCase() == 'admin') ? 
    <div>
         <a href="http://localhost:3001/manage-airlines" className="flight-option menue-link">Manage Airlines</a> 
         <a href="http://localhost:3001/manage-users" className="flight-option menue-link">Manage Users</a>
         <a href="http://localhost:3001/view-transactions" className="flight-option menue-link">View Transactions</a>
    </div> : (dataParentToChild.data.role.toLowerCase() == 'airline') ? 
    <div>
         <a href="http://localhost:3001/manage-flights" className="flight-option menue-link">Manage Flights</a> 
         <a href="http://localhost:3001/view-tickets" className="flight-option menue-link">View Tickets</a>
    </div> : null}

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

