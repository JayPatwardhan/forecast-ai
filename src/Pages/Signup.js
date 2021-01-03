import React, { Component } from 'react';
import './Signup.css' ;
import axios from 'axios';

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
                <form onSubmit = {this.handleSubmit} className='form'>
                        <h3>Sign Up</h3>

                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" onChange = {this.myChangeHandlerUsername} placeholder="Username" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" onChange = {this.myChangeHandlerPassword} placeholder="Enter password" />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                        <p className="forgot-password text-right">
                            Already registered? <a href="/Login">Log In</a>
                        </p>
                    </form>
            );
            }
            else{
                return (
                <div>
                    <h1>Welcome, {this.state.username}</h1>
                    <a href="/Login">Click here to Log In!</a>
                </div>
                );
            }
        }
    
}