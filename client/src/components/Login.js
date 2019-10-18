import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth'

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({username: '', password: ''})

  const handleChange = e => {
    setCredentials({...credentials, [e.target.name]:e.target.value})
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/login', credentials)
      .then(response => {
        // console.log(response)
        localStorage.setItem('token', response.data.payload)
        props.history.push('/bubbles')
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          name='username'
          placeholder='Username'
          onChange={handleChange}
        />
        <input 
        type='password'
        name='password'
        placeholder='Password'
        onChange={handleChange}
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
