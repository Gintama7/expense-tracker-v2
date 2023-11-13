import axios from 'axios'
import React, { useState } from 'react'
import { Button, ButtonGroup, Container, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { expenseActions } from '../store/expenses-slice';
import Papa from 'papaparse';
import EditPage from './EditPage';

const ExpenseList = (props) => {
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expensesList.expenses);
  const [show,setShow] = useState(false);
  const [editId,setEditId] = useState('');
  const [expenseInfo, setExpenseInfo] = useState({amount:0, desc:'',option:''});
  const mail = useSelector((state=>state.auth.email))
  // const mail =localStorage.getItem('email');

    const editHandler=(id,amount,desc,option)=>{
      setShow(true);
      setEditId(id);
      // console.log(amount,desc,option);
      setExpenseInfo({ amount:amount, desc:desc, option:option});
    }

    const delHandler=(id)=>{
      
        let dataPoint='';
        axios.get(`https://expense-tracker-v2-e6698-default-rtdb.firebaseio.com/expenses/${mail}.json`)
        .then((res)=>{
            const data = res.data;
            for(const key in data){
                // if (data.hasOwnProperty(key)) {
                  if(data[key].id === id)
                  {
                    dataPoint=key;
                  }
                // }
              }
              
              axios.delete(`https://expense-tracker-v2-e6698-default-rtdb.firebaseio.com/expenses/${mail}/${dataPoint}.json`)
              .then((res)=>{
                console.log('deleted successfully');
                dispatch(expenseActions.removeExpense(id));
              })
        })
    }

    const downloadHandler=(e)=>{
      const csvData = Papa.unparse(expenses)
      const blob1 = new Blob([csvData]);
      e.target.href = URL.createObjectURL(blob1);
      const link = document.createElement('a');
      
        link.href = URL.createObjectURL(blob1);
        link.download = 'expenses.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      
    }

  return (<>
  
  <EditPage show={show} onHide={()=>setShow(false)  } id={editId} expenseInfo ={expenseInfo}/>
  <Container className='mb-2 d-flex justify-content-center'>
    <Button onClick={downloadHandler} download='file.csv'>Download expenses</Button>
    </Container>
    <ListGroup>
    {expenses.map((expense)=>
        ( <ListGroupItem key={expense.id} className='d-flex align-items-center justify-content-between'>{expense.amount} {expense.desc} {expense.option} 
       
       
        
       
       <ButtonGroup>
        <Button variant='secondary' onClick={()=>editHandler(expense.id,expense.amount,expense.desc,expense.option)}>Edit</Button>
        <Button variant='danger' onClick={()=>delHandler(expense.id)}>Delete</Button>
        </ButtonGroup>
        </ListGroupItem>)
    )}
   
</ListGroup>
</>
  )
}

export default ExpenseList
