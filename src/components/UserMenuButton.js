import React, { Component } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';


const buttonStyle = {
    position: 'absolute',
    left: '50px',
    width: '110px',
    height: '110px',
    backgroundColor: '#4D4A97',
    color: '#fff',
    borderRadius: '10px',

};

export default class UserMenuButton extends Component {
    render() {
        return (
            <ButtonBase className="menubutton"style={buttonStyle} >Hello</ButtonBase>
        );
    }
}