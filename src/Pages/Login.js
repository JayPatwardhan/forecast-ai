import React, {Component} from 'react' ;
import axios from 'axios';
import './Login.css'

export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            LoggedIn: false,
            username: '',
            password: '',
            first: false,
            token: ''
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
        if (response.token !== 'Login Unsuccessful'){
            this.setState((state) => {
                return {LoggedIn: true, username: response.name, first: true, token: response.token};
            });

        }
    }

    //sends login get request
    async sendreq(jsonLogin) {
        const {data: response} = await axios.post('http://127.0.0.1:5000/Login',  jsonLogin);
        return response
    }



    render() {
        if (this.state.LoggedIn === false) {
            return (
                <form onSubmit = {this.handleSubmit} className = 'form'>
                    <h3>Log In</h3>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="email" className="form-control" onChange = {this.myChangeHandlerUserName} placeholder="Enter username" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" onChange = {this.myChangeHandlerPassword} placeholder="Enter password" />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Log In</button>
                    <p className="forgot-password text-right">
                            Forgot <a href="/">password?</a>
                    </p>
                </form>
            );
        }
        else if (this.state.first === true){
            return(
                <h1>Hello</h1>
            );
        }
    }

    
}