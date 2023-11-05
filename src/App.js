
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Layout from './components/Layout';
import SignUp from './components/SignUp';
// import SiteNavbar from './components/SiteNavbar';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';

function App() {
  return (
  <Layout>
    <Switch>
      <Route path="/" exact>
      <SignUp/>
      </Route>
      <Route path="/home" exact>
      <Home/>
      </Route>
      <Route path="/profile" exact>
      <Profile/>
     </Route>
      
    </Switch>
     
  </Layout>
     
    
   
  );
}

export default App;
