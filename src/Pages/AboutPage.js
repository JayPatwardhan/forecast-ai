import React, { Component } from 'react';
import Typist from 'react-typist';
import { Fade, Slide } from "react-awesome-reveal";
import './AboutPage.css'
import Table from 'react-bootstrap/Table';
import styled, {createGlobalStyle, css} from 'styled-components';

const GlobalStyle=createGlobalStyle`
    html {
        height: 100px;
    }

    body {
        font-family: Arial, Helvetica, sans-serif;
        background: #ECECF5;
        height: 100%;
        margin: 0;
        color: #555;
    }
`;


const HeaderStyle = {
    position: 'relative',
    top: '50px',
    left: '50px'
};

const test = {
    position: 'relative',
    top: '75px',
    left: '50px'
};

const posList={
    position: 'relative',
    left: '-50px',
    top: "100px"
};

const InputStyle = {
    position: 'relative',
    top: "100px",
    left: '50px'
};

const InputText = {
    position: 'relative',
    top: "145px",
    left: '130px',
    right: "80px"
};

export default class AboutPage extends Component {
    render () {
        return (
            <div>
                <GlobalStyle/>
                <Typist>
                    <h1 style={HeaderStyle}>About The API</h1>
                </Typist>

                <Fade style={test}>
                    <strong>Introducing a very user friendly way for anyone, engineers and non-engineers alike, to easily upload time series data and get accurate forecasts fast!</strong>
                </Fade>

                <center>
                <strong>
                    <ol class="center" type="1" style={posList}>
                        <li>Upload Data</li>
                        <li>Select configurations if desired (or leave blank!)</li>
                        <li>Wait for your forecasts</li>
                    </ol>
                </strong>
                </center>

                <Slide direction="up">
                    <h1 style={InputStyle}> Input Data Format</h1>
                    <p style={InputText}>Data must be given as a .csv file; <b>The first column must be the time column and second column the data column.</b></p>
                    <h4 style={{position: 'relative', top: '160px', left: "130px"}}>Example:</h4>

                    <Table striped bordered hover size="sm" variant="dark" style={{width: "500px", position: 'relative', top: "185px", left: "425px"}}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Items Sold</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1/1/2021</td>
                                <td>100</td>
                            </tr>
                            <tr>
                                <td>2/1/2021</td>
                                <td>250</td>
                            </tr>
                            <tr>
                                <td>2/1/2021</td>
                                <td>400</td>
                            </tr>
                            <tr>
                                <td>2/1/2021</td>
                                <td>350</td>
                            </tr>
                            <tr>
                                <td>5/1/2021</td>
                                <td>475</td>
                            </tr>
                        </tbody>
                    </Table>

                    <h1 style={{position: 'relative', top: '260px', left: "50px"}}>Configurations</h1>
                    <p style={{position: "relative", top: "285px", left: "130px", right: "80px"}}>All configurations are optional and are set to default values if their fields are not specified. A variety of configurations are offered for you to best suite</p>
                    <p style={{position: "relative", top: "290px", left: "210px", right: "80px"}}>your data forecasting needs!</p>
                </Slide>
            </div>
        );
    }
}