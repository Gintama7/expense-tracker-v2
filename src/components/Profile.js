import axios from 'axios';
import React, { useRef } from 'react'
import { Button, Container, Form } from 'react-bootstrap'

const Profile = () => {
    const nameRef = useRef();
    const urlRef = useRef();

    const profileHandler=(e)=>{
        e.preventDefault();
        const name = nameRef.current.value;
        const imgUrl= urlRef.current.value;
        const token = localStorage.getItem('token');
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDsNzMsFvb4htGZ3TcwIS3Z7_cMMV-nVrU',
        {
            idToken:token,
            displayName:name,
            photoURL:imgUrl,
            returnSecureToken:true,
        }).then((res)=>{
            console.log('profile updated successfully');
        }).catch((err)=>{
            console.log(err);
        })
    }
  return (
    <Container>
        <Form onSubmit={profileHandler}>
        <Form.Group className="mb-3" controlId="formFullName">
        <Form.Label>Enter Full Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" ref={nameRef} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formImgUrl">
        <Form.Label>Profile Photo URL</Form.Label>
        <Form.Control type="text" placeholder="Photo Url" ref={urlRef}/>
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Update
      </Button>
        </Form>
    </Container>
  )
}

export default Profile
