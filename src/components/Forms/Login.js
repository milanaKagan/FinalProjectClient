import React, { useState } from 'react';
import './FormsStyle.css';
import axios from 'axios';

const Login = (props) => {
  const [inputs, setInputs] = useState({});
  const [usernameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }
  const handleError = (data) => {
    setUserNameError(data.errors.username);
    setPasswordError(data.errors.password);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const username = inputs.username;
      const password = inputs.password;
      axios.post('http://localhost:8080/login', { username, password },
        { withCredentials: true }).then((response) => {
          props.parentCallback(response);
         }).catch((error) => {
          if (error.response) {
              handleError(error.response.data);
            }
        });

      }
    catch (err) {
      console.log(err);
    }

  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="text" id="username" name="username" placeholder="User Name"
        value={inputs.username || ""}
        onChange={handleChange} />
      <div className="username-error">{usernameError}</div>
      <input type="text" id="password" name="password" placeholder="Password"
        value={inputs.password || ""}
        onChange={handleChange}
      />
      <div className="password-error">{passwordError}</div>
      <button type="submit" >Login</button>
    </form>
  );
}

export default Login;

