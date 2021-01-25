import React, { Component } from 'react';
import './Signup.css' ;
import axios from 'axios';
import styled, {createGlobalStyle, css} from 'styled-components';

const signInStyle = {
    position: 'absolute',
    left: '450px',
    top: '150px'
}

//#3A3A3C
//#242424
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

export default class Signup extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            SignedUp: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    myChangeHandlerUsername = (event) => {
        this.setState({username: event.target.value});
    }

    myChangeHandlerPassword = (event) => {
        this.setState({password: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData()
        formData.append("username", this.state.username);
        formData.append("password", this.state.password);
        const jsonSignUp = {
            "username": this.state.username,
            "password": this.state.password,
        };
        const signed = await this.sendreq(formData)
        if (signed === 'success'){
            this.setState((state) => {
                return {SignedUp: true};
            });
        }
        else{
            this.setState((state) => {
                return {SignedUp: false};
            });
        }
    }

    async sendreq(jsonSignUp){
        const {data: response} = await axios.post('http://127.0.0.1:5000/newUser', jsonSignUp)
        return response;
    }


    render(){
        if (this.state.SignedUp === false){
            return (
                <div>
                <GlobalStyle/>
                <form style = {signInStyle} onSubmit = {this.handleSubmit} className='form'>
                        <h3 style={{color: "#26688E"}}>Sign Up</h3>

                        <div className="form-group">
                            <label style={{color: "#26688E"}}>Username</label>
                            <input style={{backgroundColor: "#1B1B1B", borderColor:"#1B1B1B", color: '#fff'}} type="text" className="form-control" onChange = {this.myChangeHandlerUsername} placeholder="Username" />
                        </div>

                        <div className="form-group">
                            <label style={{color: "#26688E"}}>Password</label>
                            <input style={{backgroundColor: "#1B1B1B", borderColor:"#1B1B1B", color: '#fff'}} type="password" className="form-control" onChange = {this.myChangeHandlerPassword} placeholder="Enter password" />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" style={{backgroundColor: "#26688E", borderColor: "#26688E"}}>Sign Up</button>
                        <p className="forgot-password text-right">
                            Already registered? <a style={{color: "#26688E"}} href="/Login">Log In</a>
                        </p>
                    </form>
                    </div>
            );
            }
            else{
                return (
                <div>
                    <GlobalStyle/>
                    <h1 style={{color: "#36D7B7"}}>Welcome, {this.state.username}</h1>
                    <a style={{color: "#26688E"}} href="/Login">Click here to Log In!</a>
                </div>
                );
            }
        }
}