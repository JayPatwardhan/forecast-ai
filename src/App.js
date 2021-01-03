import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Pages/index'
import Signup from './Pages/Signup'
import Login from './Pages/Login'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Signup" component={Signup} />
        <Route path="/Login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
