import React, {Component} from 'react' ;
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Pages/index'
import Signup from './Pages/Signup'
import Login from './Pages/Login'

export default class App extends Component{

  state = {
      isLoggedIn: false,
      token: null
  }

  toggleLoggedFalse = () => {
      this.setState({
        isLoggedIn: false
      });
  };

  setToken = (theToken) => {
    this.setState({
      token: theToken
    })
  }



  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Signup" render={(props) => (<Signup/>)} />
          <Route 
            path="/Login" 
            render={(props) => (
              <Login isLoggedIn={this.state.isLoggedIn} toggleLoggedIn={this.toggleLoggedFalse} setToken={this.setToken}/>
            )} 
          />
        </Switch>
      </Router>
    );
  }
}
