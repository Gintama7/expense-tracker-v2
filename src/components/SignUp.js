import React, { useRef } from 'react'
import { Button, Card, CardBody, Container, Form } from 'react-bootstrap'

const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const submitHandler=(e)=>{
        e.preventDefault();
        
        const email=emailRef.current.value;
        const password=passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        if(password === confirmPassword)
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
                })
                
            }else{
              return res.json().then((data)=>{
                const errorMessage = data.error.message;
                alert(errorMessage);
              })
            }
          }) 
        }else{
            alert('passwords dont match');
        }
    }
  return (
    <Container className='mt-5 d-flex flex-column justify-content-center align-items-center m-auto'>
        <Card>
            <CardBody>
    <Form onSubmit={submitHandler}>
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" required ref={emailRef}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required ref={passwordRef}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" required ref={confirmPasswordRef}/>
      </Form.Group>
      <Button variant="primary" type="submit">
       Sign Up
      </Button>
    </Form>
    </CardBody>
    </Card>
    </Container>
  )
}

export default SignUp
