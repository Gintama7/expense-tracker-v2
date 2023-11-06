import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const SiteNavbar = () => {
  const history = useHistory();

  const logOutHandler=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    history.replace('/');
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="/">MyWebLink</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="#link">Products</Nav.Link>
          <Nav.Link href="#link">About Us</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
    
      <Nav>
        <Button style={{marginRight:'5px'}} onClick={logOutHandler}>Log Out</Button>
      </Nav>
    
  </Navbar>
  )
}

export default SiteNavbar
