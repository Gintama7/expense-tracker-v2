import axios from 'axios';
import React from 'react'
import { Button, Container, Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

const Home = () => {

  const isAuth = useSelector((state)=> state.auth.isAuthenticated);
  const token = useSelector((state)=> state.auth.token);

  const verifyHandler=()=>{
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
    
      <Container className='d-flex flex-column align-items-center mt-5 justify-content-center'>
      <h2>Welcome to Expense Tracker</h2>          
        {!isAuth ? 
         
          <Link to="/login">Get Started</Link>
         
         :
        <>
          <p>Your profile is incomplete. <Link to='/profile'>Complete Now</Link></p>
        <p onClick={verifyHandler} style={{cursor:'pointer', color:'blue',textDecoration:'underline'}}>Verify your email</p>
        </>}
        
        </Container>
  )
}

export default Home
