import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'

const Profile = () => {
    const [name,setName] = useState('');
    const [imgUrl,setImgUrl] = useState('')

    useEffect(()=>{
      const token = localStorage.getItem('token');
      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDsNzMsFvb4htGZ3TcwIS3Z7_cMMV-nVrU',{
    idToken:token
      })
      .then((res)=>{
      setName(res.data.users[0].displayName)
      // setImgUrl(res.data.users[0].photoURL);
      console.log(res.data.users[0]);
      })
    },[])

    const profileHandler=(e)=>{
        e.preventDefault();
        const token = localStorage.getItem('token');
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDsNzMsFvb4htGZ3TcwIS3Z7_cMMV-nVrU',
        {
            idToken:token,
            displayName:name,
            photoURL:imgUrl,
            returnSecureToken:true,
        }).then((res)=>{
            console.log('profile updated successfully');
            console.log(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }
  return (
    <Container>
        <Form onSubmit={profileHandler}>
        <Form.Group className="mb-3" controlId="formFullName">
        <Form.Label>Enter Full Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" onChange={(e)=>setName(e.target.value)} value={name} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formImgUrl">
        <Form.Label>Profile Photo URL</Form.Label>
        <Form.Control type="text" placeholder="Photo Url" onChange={(e)=>setImgUrl(e.target.value)} value={imgUrl}/>
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Update
      </Button>
        </Form>
    </Container>
  )
}

export default Profile
