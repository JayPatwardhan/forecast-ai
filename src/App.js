import React, {Component} from 'react' ;
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';
import Home from './Pages/index'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import FileUpload from './Pages/FileUpload'
import ConfigComp from './Pages/configComp'
import DisplayResult from './Pages/DisplayResult'

class App extends Component{

  state = {
      isLoggedIn: false,
      token: null,

      csvFile: new FormData(),
      Response_Result: ''
  }

  toggleLoggedFalse = () => {
      this.setState({
        isLoggedIn: true
      });
  };

  setToken = (theToken) => {
    this.setState({
      token: theToken
    })
  }



  render() {
    if (this.state.isLoggedIn===false){
      return (
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Signup" render={(props) => (<Signup {...props}/>)} />
            <Route 
              path="/Login" 
              render={(props) => (
                <Login {...props} isLoggedIn={this.state.isLoggedIn} toggleLoggedIn={this.toggleLoggedFalse} setToken={this.setToken}/>
              )} 
            />
          </Switch>
        </Router>
      );
    }
    else{
      return (
        <Router>
          <Navbar />
          <Route path="/fileUpload" render={(props) => (<FileUpload {...props} fData={this.state.csvFile}/>)} />
          <Route path="/config" render={(props) => (<ConfigComp {...props} fData={this.state.csvFile} token={this.state.token} res_result={this.state.Response_Result}/>)} />
          <Route path="/displayResult" render={(props) => (<DisplayResult {...props} res_result={this.state.Response_Result} test={'hello'}/>)} />
        </Router>
      );
    }
  }
}

export default withRouter(App);
