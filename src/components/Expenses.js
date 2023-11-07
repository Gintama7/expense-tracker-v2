import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Container, Form, ListGroup, ListGroupItem } from 'react-bootstrap'

const Expenses = () => {
 const amountRef = useRef();
 const descRef = useRef();
 const optionRef = useRef();
 const [expenses,setExpenses] = useState([]);

 useEffect(()=>{
  axios.get('https://expense-tracker-v2-e6698-default-rtdb.firebaseio.com/expenses.json')
  .then((res)=>{
    const data = res.data;
    for(const key in data){
      if (data.hasOwnProperty(key)) {
        setExpenses(prev=>[...prev,data[key]]);
      }
    }
  })
 },[])

//  console.log(expenses);

 const expenseHandler=(e)=>{
e.preventDefault();
let amount = amountRef.current.value;
let desc = descRef.current.value;
let option = optionRef.current.value;

let obj = {id:desc,amount:amount,desc:desc,option:option}
axios.post('https://expense-tracker-v2-e6698-default-rtdb.firebaseio.com/expenses.json',{
  id:desc,amount:amount,desc:desc,option:option
}).then((res)=>{  
    console.log(res.data);
    setExpenses(prev=>[...prev,obj]);
})
// setExpenses(prev=>[...prev,obj]);
amountRef.current.value = 0;
 descRef.current.value= '';
 optionRef.current.value= '';
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
        <Form.Control placeholder="Enter Amount Spent" type='number' required  ref={amountRef}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control placeholder="Enter description"  required ref={descRef}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Select Category</Form.Label>
        <Form.Select ref={optionRef} >
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
    <ListGroup>
        {expenses.map((expense)=>
            ( <ListGroupItem key={expense.id}>{expense.amount} {expense.desc} {expense.option}</ListGroupItem>)
        )}
       
    </ListGroup>
    </Container>
   </Container>
  )
}

export default Expenses
