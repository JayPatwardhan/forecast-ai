import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

const welcomeStyle = {
    position: 'absolute',
    top: '100px',
    left: '50px'
};

const uploadDataButtonStyle = {
    position: 'absolute',
    top: '200px',
    left: '50px'
};

const getDataStyle = {
    position: 'absolute',
    top: '275px',
    left: '50px'
};

export default class UserMenu extends Component{

    goToUpload = () => {
        this.props.history.push('fileUpload')
    };

    render () {
        return (
            <div>
                <h1 style={welcomeStyle}>Hello {this.props.username}, what would you like to do?</h1>
                <Button variant="outline-primary" style={uploadDataButtonStyle} size='lg' onClick={this.goToUpload}>Upload New Data</Button>{' '}
                <Button variant="outline-primary" style={getDataStyle} size='lg'>Work With Previously Saved Data</Button>{' '}
            </div>
        );
    }
}