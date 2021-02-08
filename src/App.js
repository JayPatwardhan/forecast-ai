import React, {Component} from 'react' ;
import './App.css';
import Navbar from './components/Navbar';
import LoggedInNavbar from './components/LoggedInNavbar/index';
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';
import Home from './Pages/index'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import FileUpload from './Pages/FileUpload';
import ConfigComp from './Pages/configComp';
import DisplayResult from './Pages/DisplayResult';
import FileUploadTrial from './Pages/FileUploadTrial';
import ConfigCompTrial from './Pages/configCompTrial.js';
import UserMenu from './Pages/UserMenu';
import DataSelected from './Pages/DataSelected';
import AboutPage from './Pages/AboutPage';

class App extends Component{

  state = {
      isLoggedIn: false,
      token: null,
      username: '',

      csvFile: new FormData(),
      Response_Result: '',

      trial_input: new FormData(),
      selectedSavedData: '',
      selectedFData: new FormData()
  }

  setSelected = (inp) => {
    this.setState({selectedSavedData: inp})
  };

  setUserName = (name) => {
    this.setState({username: name})
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

  logOut = () => {
    this.setState({
      token: '',
      isLoggedIn: false
    });
  }



  render() {
    if (this.state.isLoggedIn===false){
      return (
        <Router basename="/forecast-ai">
          <Navbar/>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Signup" render={(props) => (<Signup {...props}/>)} />
            <Route 
              path="/Login" 
              render={(props) => (
                <Login {...props} isLoggedIn={this.state.isLoggedIn} toggleLoggedIn={this.toggleLoggedFalse} setToken={this.setToken}  setUserName={this.setUserName}/>
              )} 
            />
            <Route path="/trial" render={(props) => (<FileUploadTrial {...props} fData={this.state.trial_input}/>)} />
            <Route path="/trialForm" render={(props) => (<ConfigCompTrial {...props} fData={this.state.trial_input}/>)} />
            <Route path="/About" render={(props) => (<AboutPage {...props}/>)} />
          </Switch>
        </Router>
      );
    }
    else{
      return (
        <Router basename="/forecast-ai">
            <LoggedInNavbar logOut={this.logOut}/>
            <Switch>
              <Route path="/fileUpload" render={(props) => (<FileUpload {...props} fData={this.state.csvFile}/>)} />
              <Route path="/config" render={(props) => (<ConfigComp {...props} fData={this.state.csvFile} token={this.state.token} res_result={this.state.Response_Result}/>)} />
              <Route path="/displayResult" render={(props) => (<DisplayResult {...props} res_result={this.state.Response_Result} test={'hello'}/>)} />
              <Route path="/userMenu" render={(props) => (<UserMenu {...props} username={this.state.username} token={this.state.token} setSelected={this.setSelected}/>)} />
              <Route path="/selectedSavedData" render={(props) => (<DataSelected {...props} token={this.state.token} data_id={this.state.selectedSavedData} fData={this.state.selectedFData}/>)} />
            </Switch>
        </Router>
      );
    }
  }
}

export default withRouter(App);
