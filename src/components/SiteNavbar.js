import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { authActions } from '../store/auth-slice';

const SiteNavbar = () => {
  const history = useHistory();
  // const token = localStorage.getItem('token');
  const isAuth = useSelector((state)=>state.auth.isAuthenticated);
  const dispatch =useDispatch();


  const logOutHandler=()=>{
    dispatch(authActions.logout());
    history.replace('/');
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="/">MyWebLink</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/expenses">Expenses</Nav.Link>
          <Nav.Link href="#link">About Us</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
    
    {isAuth && <Nav>
        <Button style={{marginRight:'5px'}} onClick={logOutHandler}>Log Out</Button>
      </Nav>
    }
  </Navbar>
  )
}

export default SiteNavbar
