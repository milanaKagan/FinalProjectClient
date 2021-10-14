import React, { useState } from 'react'
import './FormsStyle.css';
import axios from 'axios';


const SignUp = (props) => {
  const [role, setRole] = useState('customer');
  const [inputs, setInputs] = useState({});
  const [usernameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const handleRoleChange = (event) => {
    setRole(event.target.value)
  }
  const handleError = (data) => {
    setUserNameError(data.errors.username.toLowerCase());
    setPasswordError(data.errors.password.toLowerCase());
    setEmailError(data.errors.email.toLowerCase());
  }
  const handleSignUp = async (event) => {
    event.preventDefault();
    const username = inputs.username;
    const email = inputs.email;
    const password = inputs.password;
    axios.post('http://localhost:8080/signup', { email, username, password, role },
      { withCredentials: true }).then((response) => {
        props.parentCallback(response);
        if (role.toLocaleLowerCase() === "airline") {
          const user_id = response.id;
          const airline_name = inputs.airline_name;
          const country = inputs.country;
          axios.post('http://localhost:8080/admin/airlines', { airline_name, country, user_id }).then((response) => { })
            .catch((error) => {
              if (error.response) {
                handleError(error.response.data);
              }
            })
        }
        if (response.data.role.toLocaleLowerCase() === "customer" && response.data.id) {
          const _user_id =  response.data.id;
          console.log(response)
          console.log(inputs)
          const first_name = inputs.first_name;
          const last_name = inputs.last_name;
          const address = inputs.address;
          const phone_no = inputs.phone_no;
          const credit_card_no = inputs.credit_card_no;
          axios.post('http://localhost:8080/customer/customers', { first_name, last_name, address,phone_no,credit_card_no,user_id : _user_id})
            .then((response) => { })
            .catch((error) => {
              console.log(error)
            })
        }
      }).catch((error) => {
        console.log(error)
        if (error.response) {
          handleError(error.response.data);
        }
      })
  }
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }
  return (
    <form className="form" onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
      <input type="text" id="username" placeholder="Choose Username" name="username" value={inputs.username || ""} onChange={handleChange} />
      <div className="username-error">{usernameError}</div>
      <input type="text" id="password" placeholder="Choose Password" name="password" value={inputs.password || ""} onChange={handleChange} />
      <div className="password-error">{passwordError}</div>
      <input type="text" id="email" placeholder="Set Email" name="email" value={inputs.email || ""} onChange={handleChange} />
      <div className="email-error">{emailError}</div>
      <select name="role-picker" id="role-picker" onChange={handleRoleChange}>
        <option value="Customer">Customer</option>
        <option value="Airline">Airline</option>
        <option value="Admin">Admin</option>
      </select>
      {(role.toLowerCase() == 'airline') ?
        <div className="airline-signup">
          <input type="text" id="airline-name" placeholder="Airline Brand" name="airline-name" value={inputs.airline_name || ""} onChange={handleChange} />
          <select name="airline-country" id="airline-country" value={inputs.country || ""} onChange={handleChange}>
            <option value="Israel">Israel</option>
          </select>
        </div> : null}
      {(role.toLowerCase() == 'customer') ?
        <div className="customer-signup">
          <input type="text" id="first" name="first_name" placeholder="First Name" value={inputs.first_name || ""} onChange={handleChange} />
          <input type="text" id="last" name="last_name" placeholder="Last Name" value={inputs.last_name || ""} onChange={handleChange} />
          <input type="text" id="address" name="address" placeholder="Address" value={inputs.address || ""} onChange={handleChange} />
          <input type="text" id="phone" name="phone_no" placeholder="Phone Number" value={inputs.phone_no || ""} onChange={handleChange} />
          <input type="text" name="credit_card_no" id="creditCard" placeholder="Credit Card Number" value={inputs.credit_card_no || ""} onChange={handleChange} />
        </div> : null}
      <button type="submit">Sign Up</button>
    </form>
  );
}
export default SignUp;

