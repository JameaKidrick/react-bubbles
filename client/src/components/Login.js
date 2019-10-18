import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { Button, Form, TextInput, Box } from "grommet";

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
    <div style={{margin:'0 auto'}}>
      <h1 style={{textAlign:'center', height:'45px'}}>Welcome to the Bubble App!</h1>
      <Form onSubmit={handleSubmit} style={{height:'300px', display:'flex', flexDirection:'column', flexWrap:'wrap', alignItems:'flex-start'}}>
        <TextInput
          // type='text'
          name='username'
          placeholder='Username'
          onChange={handleChange}
          style={{width:'75%', margin:'20px'}}
        />
        <TextInput
        // type='password'
        name='password'
        placeholder='Password'
        onChange={handleChange}
        style={{width:'75%', margin:'20px'}}
        />
        <Button label='login' style={{width:'30%', margin:'0 250px'}} />
      </Form>
    </div>
  );
};

export default Login;


