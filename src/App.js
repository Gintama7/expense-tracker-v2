
import { Redirect, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Layout from './components/Layout';
import SignUp from './components/SignUp';
// import SiteNavbar from './components/SiteNavbar';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Expenses from './components/Expenses';
import { useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth-slice';
import { expenseActions } from './store/expenses-slice';


let isInitial =true;

function App() {
  const dispatch = useDispatch();  
  const isAuth = useSelector((state)=>state.auth.isAuthenticated);
  // const expenses = useSelector(state => state.expensesList.expenses);
  // const token = useSelector(state=> state.auth.token);
  const expenseList = useSelector(state=> state.expenseList);

  const theme = useSelector(state => state.theme.currTheme);
//  const email = useSelector(state=> state.auth.email);

  useEffect(()=>{
    document.body.dataset.bsTheme = theme;
  },[theme])

  
  useEffect(()=>{
    let token = localStorage.getItem('token');
    let email = localStorage.getItem('email');
 
    if(token)
    {
      // console.log(token);
      dispatch(authActions.login({token,email}));
      axios.get(`https://expense-tracker-v2-e6698-default-rtdb.firebaseio.com/expenses/${email}.json`)
  .then((res)=>{
    const data = res.data;
    for(const key in data){
      if (data.hasOwnProperty(key)) {
        dispatch(expenseActions.addExpense(data[key]));
      }
    }
  })
    }
  },[])

  
  return (
  <Layout className={theme}>
    <Switch>
      <Route path="/" exact>
      <Home/>
      </Route>
      <Route path="/login" >
       <SignUp/>    
      </Route>
      <Route path="/profile" >
      <Profile/>
     </Route>
     <Route path="/expenses">
     {isAuth && <Expenses/>}
     {/* {!isAuth && <Redirect to='/'/>} */}
     </Route>
     <Route path='*'>
     <Redirect to='/'/>
     </Route>
    </Switch>
     
  </Layout>
     
    
   
  );
}

export default App;
