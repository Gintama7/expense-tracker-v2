import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../store/expenses-slice';

const EditPage = (props) => {

    const [inputAmount,setInputAmount] = useState(0);
    const [inputDesc,setInputDesc] = useState('');
    const [inputCategory,setInputCategory] = useState('food');
    const dispatch =useDispatch();
    const mail = useSelector(state=> state.auth.email);

    const updateHandler=()=>{
        let dataPoint='';
        // const mail = localStorage.getItem('email');
        console.log(mail);
        axios.get(`https://expense-tracker-v2-e6698-default-rtdb.firebaseio.com/expenses/${mail}.json`)
        .then((res)=>{
            const data = res.data;
            for(const key in data){                
                  if(data[key].id === props.id)
                  {
                   setInputAmount(data[key].amount);
                   setInputDesc(data[key].desc);
                   setInputCategory(data[key].option);
                    dataPoint=key;
                }
              
              }
              console.log(dataPoint);
              axios.put(`https://expense-tracker-v2-e6698-default-rtdb.firebaseio.com/expenses/${mail}/${dataPoint}.json`,
              {id:inputDesc,amount:inputAmount,desc:inputDesc,option:inputCategory})
              .then((res)=>{
                console.log('edited successfully');
               props.onHide();
               dispatch(expenseActions.addExpense({id:inputDesc,amount:inputAmount,desc:inputDesc,option:inputCategory}))
              }).catch((err)=>{
                console.log(err);
              })
        })
    }

  
  return (
   
    <Modal
    show={props.show}
    onHide={props.onHide}
    backdrop="static"
    keyboard={false}
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title>Edit Expense</Modal.Title>
    </Modal.Header>
    <Modal.Body>
     <Form>
     <Form.Group className="mb-3">
        <Form.Label>Money Spent</Form.Label>
        <Form.Control placeholder="Enter Amount Spent" type='number' required  onChange={(e)=>setInputAmount(e.target.value)} value={inputAmount}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control placeholder="Enter description"  required  onChange={(e)=>setInputDesc(e.target.value)} value={inputDesc}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Select Category</Form.Label>
        <Form.Select onChange={(e)=>setInputCategory(e.target.value)} value={inputCategory} >
          <option value='food'>Food</option>
          <option value='fuel'>Fuel</option>
          <option value='electricity'>Electricity</option>
          <option value='Misc'>Misc</option>
          <option value='movie'>Movie</option>
        </Form.Select>
      </Form.Group>
     </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.onHide}>
        Close
      </Button>
      <Button variant="primary" onClick={updateHandler}>Update Expense</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default EditPage
