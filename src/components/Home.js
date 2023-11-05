import React from 'react'
import { Container } from 'react-bootstrap'
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <Container>
        <h2>Welcome to Expense Tracker</h2>
        <p>Your profile is incomplete. <Link to='/profile'>Complete Now</Link></p>
    </Container>
  )
}

export default Home
