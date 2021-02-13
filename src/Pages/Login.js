import React, {Component} from 'react' ;
import axios from 'axios';
import './Login.css'
import styled, {createGlobalStyle, css} from 'styled-components';

const GlobalStyle=createGlobalStyle`
    html {
        height: 100px;
    }

    body {
        font-family: Arial, Helvetica, sans-serif;
        background: #1B1B1B;
        height: 100%;
        margin: 0;
        color: #555;
    }
`;

const logInStyle = {
    position: 'relative',
    top: '65px'
}

export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            LoggedIn: false,
            username: '',
            password: '',
            first: false,
            token: '',
            wrongLogin:false
        };

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    myChangeHandlerUserName = (event) => {
        this.setState({username: event.target.value});
    }

    myChangeHandlerPassword = (event) => {
        this.setState({password: event.target.value});
    }



    //login click method
    async handleSubmit(event) {
        event.preventDefault()
        const loginForm = new FormData()
        loginForm.append("username", this.state.username);
        loginForm.append("password", this.state.password);
        //const jsonLogin = {"email": this.state.username, "password": this.state.password};
        const response = await this.sendreq(loginForm)
        console.log(response.token)
        if (response.token !== 'Invalid username and/or password'){
            this.props.toggleLoggedIn()
            this.props.setToken(response.token)
            this.props.setUserName(this.state.username)
            this.props.history.push('/userMenu')
        }
        else{
            this.setState({wrongLogin: true});
        }
    }

    //sends login get request
    async sendreq(jsonLogin) {
        const {data: response} = await axios.post(this.props.url + '/Login',  jsonLogin);
        return response
    }

    displayWrongPassword = () => {
        if(this.state.wrongLogin === true){
            return (
                <p style={{color: "#e60000"}}> Invalid username and/or password</p>
            );
        }
    }



    render() {
        if (this.props.isLoggedIn === false) {
            return (
                <div>
                <GlobalStyle/>
                <form style={logInStyle} onSubmit = {this.handleSubmit} className = 'form'>
                    <h3 style={{color: "#26688E"}}>Log In</h3>

                    <div className="form-group">
                        <label style={{color: "#26688E"}}>Username</label>
                        <input style={{backgroundColor: "#1B1B1B", borderColor:"#1B1B1B", color: '#fff'}} type="text" className="form-control" onChange = {this.myChangeHandlerUserName} placeholder="Enter username" />
                    </div>

                    <div className="form-group">
                        <label style={{color: "#26688E"}}>Password</label>
                        <input style={{backgroundColor: "#1B1B1B", borderColor:"#1B1B1B", color: '#fff'}} type="password" className="form-control" onChange = {this.myChangeHandlerPassword} placeholder="Enter password" />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" style={{backgroundColor: "#26688E", borderColor: "#26688E"}}>Log In</button>
                    <p className="forgot-password text-right">
                            Forgot <a style={{color: "#26688E"}} href="/">password?</a>
                    </p>
                    {this.displayWrongPassword()}
                </form>
                </div>
            );
        }
        else {
            return(
                <h1>Hello</h1>
            );
        }
    }

    
}