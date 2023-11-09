import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Button, ButtonGroup, Card, Container, Form, ListGroup, ListGroupItem } from 'react-bootstrap'
import ExpenseList from './ExpenseList';
import { useDispatch } from 'react-redux';
import { expenseActions } from '../store/expenses-slice';

const Expenses = (props) => {
 const [amountRef,setAmountRef] = useState(0);
 const[ descRef,setDescRef] = useState('')
 const [optionRef,setOptionRef] = useState('food');
 const dispatch = useDispatch();


 const listHandler=(name,value)=>{
  if(name === 'amount')
  {
    setAmountRef(value);
  }
  else if(name === 'desc')
  {
    setDescRef(value);
  }else if(name === 'option')
  {
    setOptionRef(value);
  }
 }


 const expenseHandler=(e)=>{
e.preventDefault();

// let obj = {id:desc,amount:amount,desc:desc,option:option}
axios.post('https://expense-tracker-v2-e6698-default-rtdb.firebaseio.com/expenses.json',{
  id:descRef,amount:amountRef,desc:descRef,option:optionRef
}).then((res)=>{  
    console.log('added successfully');
})
// setExpenses(prev=>[...prev,obj]);
setAmountRef(0);
setDescRef('');
setOptionRef('select an option');
 }
  return (
   <Container>
    <Container>
        <Card>
            <Card.Header>Add Expenses</Card.Header>
            <Card.Body>
            <Form onSubmit={expenseHandler}>
            <Form.Group className="mb-3">
        <Form.Label>Money Spent</Form.Label>
        <Form.Control placeholder="Enter Amount Spent" type='number' required  onChange={(e)=>setAmountRef(e.target.value)} value={amountRef}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control placeholder="Enter description"  required  onChange={(e)=>setDescRef(e.target.value)} value={descRef}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Select Category</Form.Label>
        <Form.Select onChange={(e)=>setOptionRef(e.target.value)} value={optionRef} >
          <option value='food'>Food</option>
          <option value='fuel'>Fuel</option>
          <option value='electricity'>Electricity</option>
          <option value='rent'>Rent</option>
          <option value='movie'>Movie</option>
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Button type='submit'>Add Expense</Button>
      </Form.Group>
            </Form>
            </Card.Body>
        </Card>
        
    </Container>
    <Container className='mt-3'>
   <ExpenseList expenses={props.expenses} amountRef={listHandler} descRef={listHandler} optionRef={listHandler} amount={amountRef} desc={descRef} option={optionRef} />
    </Container>
   </Container>
  )
}

export default Expenses
