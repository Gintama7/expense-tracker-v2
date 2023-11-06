
import { Redirect, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Layout from './components/Layout';
import SignUp from './components/SignUp';
// import SiteNavbar from './components/SiteNavbar';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Expenses from './components/Expenses';
import { useEffect, useState } from 'react';

function App() {
  // const [isLogin,setIsLogin] = useState(false);

  // useEffect(()=>{
  //   let token = localStorage.getItem('token');
  //   if(token)
  //   {
  //     setIsLogin(true);
  //   }
  // },[])
  
  return (
  <Layout>
    <Switch>
      <Route path="/" exact>
      <SignUp/>
      </Route>
      <Route path="/home" exact>
       isLogin && <Home/>
     {/* {!isLogin && <Redirect to='/'/>} */}
      </Route>
      <Route path="/profile" exact>
      <Profile/>
     </Route>
     <Route path="/expenses" exact>
     <Expenses/>
     {/* {!isLogin && <Redirect to='/'/>} */}
     </Route>
    </Switch>
     
  </Layout>
     
    
   
  );
}

export default App;
