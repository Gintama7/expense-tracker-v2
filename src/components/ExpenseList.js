import axios from 'axios'
import React from 'react'
import { Button, ButtonGroup, Container, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { expenseActions } from '../store/expenses-slice';
import Papa from 'papaparse';

const ExpenseList = (props) => {
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expensesList.expenses);
 
    const editHandler=(id)=>{
        let dataPoint='';
        axios.get('https://expense-tracker-v2-e6698-default-rtdb.firebaseio.com/expenses.json')
        .then((res)=>{
            const data = res.data;
            for(const key in data){                
                  if(data[key].id === id)
                  {
                    props.amountRef('amount',data[key].amount);
                    props.descRef('desc',data[key].desc);
                    props.descRef('option',data[key].option);
                    dataPoint=key;
                }
              
              }
              console.log(dataPoint);
              axios.put(`https://expense-tracker-v2-e6698-default-rtdb.firebaseio.com/expenses/${dataPoint}.json`,
              {id:props.desc,amount:props.amount,desc:props.desc})
              .then((res)=>{
                console.log('edited successfully');
                props.amountRef('amount',0);
                props.descRef('desc','');
                props.descRef('option','');
              }).catch((err)=>{
                console.log(err);
              })
        })
    }

    const delHandler=(id)=>{
        let dataPoint='';
        axios.get('https://expense-tracker-v2-e6698-default-rtdb.firebaseio.com/expenses.json')
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
              
              axios.delete(`https://expense-tracker-v2-e6698-default-rtdb.firebaseio.com/expenses/${dataPoint}.json`)
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
  <Button onClick={downloadHandler} download='file.csv'>Download expenses</Button>
    <ListGroup>
    {expenses.map((expense)=>
        ( <ListGroupItem key={expense.id} className='d-flex align-items-center justify-content-between'>{expense.amount} {expense.desc} {expense.option} 
       
       
        
       
       <ButtonGroup>
        <Button variant='secondary' onClick={()=>editHandler(expense.id)}>Edit</Button>
        <Button variant='danger' onClick={()=>delHandler(expense.id)}>Delete</Button>
        </ButtonGroup>
        </ListGroupItem>)
    )}
   
</ListGroup>
</>
  )
}

export default ExpenseList
