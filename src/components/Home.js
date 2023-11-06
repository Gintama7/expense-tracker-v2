import axios from 'axios';
import React from 'react'
import { Container } from 'react-bootstrap'
import {Link} from 'react-router-dom';

const Home = () => {

  const verifyHandler=()=>{
   let token =  localStorage.getItem('token');
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDsNzMsFvb4htGZ3TcwIS3Z7_cMMV-nVrU',
    {
      requestType:'VERIFY_EMAIL',idToken:token
    }).then((res)=>
    {
      console.log(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <Container>
        <h2>Welcome to Expense Tracker</h2>
        <p>Your profile is incomplete. <Link to='/profile'>Complete Now</Link></p>
        <p onClick={verifyHandler}>Verify your email</p>
    </Container>
  )
}

export default Home
