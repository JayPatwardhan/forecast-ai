import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
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

const welcomeStyle = {
    position: 'absolute',
    top: '100px',
    left: '50px',
    color: "#26688E"
};

const uploadDataButtonStyle = {
    position: 'absolute',
    top: '200px',
    left: '50px',
    color: "#26688E",
    borderColor: "#26688E"
};

const getDataStyle = {
    position: 'absolute',
    top: '275px',
    left: '50px',
    color: "#26688E",
    borderColor: "#26688E"
};

const SelectHeaderStyle = {
    position: 'absolute',
    top: '100px',
    left: '50px'
};

export default class UserMenu extends Component{

    constructor(props){
        super(props);
        this.state = {
            getDataClicked: false,
            dataArray: '',
            leftVar: '50px',
            leftTrack:50
        };
    }

    goToUpload = () => {
        this.props.history.push('fileUpload')
    };

    dataSelected = (selectedOne) => {
        this.props.setSelected(selectedOne);
        this.props.history.push('/selectedSavedData')
    };

    makeDataButtons = (data) => {
        return(
                <Button variant="outline-primary" style={{position: 'absolute', top: '275px', left: data[2], color: "#26688E", borderColor: "#26688E"}} size='lg' onClick={() => {this.dataSelected(data[0])}}>{data[0]}({data[1]})</Button>
        );
    }

    displayData = (inp) => {
        let leftComp = 50
        var asArray = []
        for (var i in inp){
            asArray.push([i, inp[i], leftComp.toString() + 'px']);
            leftComp = leftComp+275
        }
        console.log(asArray)
        this.setState({dataArray: asArray, getDataClicked: true})
    };

    listDatasets = () => {
        axios.get('http://127.0.0.1:5000/getSavedData', {
            headers: {
                "Authorization": this.props.token
            }
        })
        .then(res => {
            this.displayData(res.data);
        })
        .catch(err => console.warn(err))
    }

    render () {
        if (this.state.getDataClicked===false){
            return (
                <div>
                    <GlobalStyle/>
                    <h1 style={welcomeStyle}>Hello {this.props.username}, what would you like to do?</h1>
                    <Button variant="outline-primary" style={uploadDataButtonStyle} size='lg' onClick={this.goToUpload}>Upload New Data</Button>{' '}
                    <Button variant="outline-primary" style={getDataStyle} size='lg' onClick={this.listDatasets}>Work With Previously Saved Data</Button>{' '}
                </div>
            );
        }
        else{
            return (
                <div>
                    <GlobalStyle/>
                    <h1 style={SelectHeaderStyle}>Please select which data you would like to work with!</h1>
                    {this.state.dataArray.map(this.makeDataButtons, this)}
                </div>
            );
        }
    }
}