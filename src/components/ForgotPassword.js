import axios from 'axios';
import React, { useRef } from 'react'
import { Button, Card, Form } from 'react-bootstrap'

const ForgotPassword = () => {
    const emailRef = useRef();

    const passwordHandler=(e)=>{
            e.preventDefault();
            const email = emailRef.current.value;
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDsNzMsFvb4htGZ3TcwIS3Z7_cMMV-nVrU',
        {
            requestType:"PASSWORD_RESET",email:email
        }).then((res)=>{
            console.log('sent an email');
        }).catch((err)=>{
            console.log(err);
        })
    }
  return (
    <Card>
        <Card.Body>
        <Form>
         <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Enter the registered email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" required ref={emailRef}/>
      </Form.Group>
      <Form.Group className='d-flex flex-column'>
        <Button variant='danger' onClick={passwordHandler}>Send Link</Button>
        </Form.Group>
        </Form>
        </Card.Body>
    </Card>
  )
}

export default ForgotPassword
