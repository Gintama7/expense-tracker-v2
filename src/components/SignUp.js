import React, { useRef, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ForgotPassword from './ForgotPassword';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth-slice';

const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [showLogin,setShowLogin] = useState(true);
    const [forgotPass,setForgotPass] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  
  const loginSwitchHandler=()=>{
    setShowLogin(!showLogin);
  }

    const submitHandler=(e)=>{
        e.preventDefault();
        
        const email=emailRef.current.value;
        const password=passwordRef.current.value;
        // localStorage.setItem('email',email);
        // const confirmPassword = confirmPasswordRef.current.value;
        // if(password === confirmPassword)
        if(!showLogin)
        {
           
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDsNzMsFvb4htGZ3TcwIS3Z7_cMMV-nVrU',{
            method:'POST',
            body: JSON.stringify({
              email:email,
              password:password,
              returnSecureToken: true
            }),headers:{
              'Content-Type':'application/json'
            }
          }).then((res) =>{
            if(res.ok){
                return res.json().then((data)=>{
                    console.log('successfully signed up');
                     dispatch(authActions.login(data.idToken));
                    history.replace('/home');                 
                })
                
            }else{
              return res.json().then((data)=>{
                const errorMessage = data.error.message;
                alert(errorMessage);
              })
            }
          }) 
        }else{
            // alert('passwords dont match');
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDsNzMsFvb4htGZ3TcwIS3Z7_cMMV-nVrU',{
        method:'POST',
        body: JSON.stringify({
          email:email,
          password:password,
          returnSecureToken: true
        }),headers:{
          'Content-Type':'application/json'
        }
      }).then((res) =>{
        // setIsSignUp(false);
        if(res.ok){
            return res.json().then((data)=>{
              // authCtx.login(data.idToken);
              dispatch(authActions.login(data.idToken));
              history.replace('/home');
            })
            
        }else{
          return res.json().then((data)=>{
            const errorMessage = data.error.message;
            alert(errorMessage);
          })
        }
      })
        }
    }
  return (
    <Container className='mt-5 d-flex flex-column justify-content-center align-items-center m-auto'>
      {!forgotPass ?  <Card>
            <Card.Body>
    <Form onSubmit={submitHandler}>
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" required ref={emailRef}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required ref={passwordRef}/>
      </Form.Group>
     { !showLogin && (<Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" required ref={confirmPasswordRef}/>
      </Form.Group>)}
      <Form.Group className='d-flex flex-column'>
     {showLogin && <p style={{alignSelf:'center',color:'green',cursor:'pointer'}} onClick={()=>{setForgotPass(true)}}>Forgot password?</p>}
       <Button variant="primary" type="submit">
      
       {!showLogin?'Sign Up': 'Login'}
      </Button>
      </Form.Group>
     
    </Form>
    </Card.Body>
    {!showLogin && <Card.Footer>
      Already have an account? <span style={{color:'blue',cursor:'pointer'}} onClick={loginSwitchHandler}>Login</span>
      </Card.Footer>}
      {showLogin && <Card.Footer>
      Already have an account? <span style={{color:'blue',cursor:'pointer'}} onClick={loginSwitchHandler}>SignUp</span>
      </Card.Footer>}
    </Card>
   : <ForgotPassword/> }
   
     
   
     </Container>

  )
}

export default SignUp
