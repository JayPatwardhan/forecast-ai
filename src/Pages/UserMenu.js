import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import styled, {createGlobalStyle, css} from 'styled-components';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

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
    color: "#36D7B7",
};

const SelectHeaderStyle = {
    position: 'absolute',
    top: '100px',
    left: '50px'
};

const columns = [
    {field:'id', headerName: 'index', width: 100},
    {field: 'dataName', headerName: 'Dataset Name', width: 180, description: "The given name on the dataset"},
    {field: 'dataID', headerName: 'Dataset ID', width: 180, description: "The unique data ID that identifies this dataset as listed in your downloaded results"}

]

export default class UserMenu extends Component{

    constructor(props){
        super(props);
        this.state = {
            getDataClicked: false,
            dataArray: '',
            leftVar: '50px',
            leftTrack:50,
            rows: [],
            selected: null
        };
    }

    handleTableData = (res) => {
        var rowsArray=[]
        var counter= 0
        for (var i in res){
            rowsArray.push({id: counter, dataName: res[i], dataID: i})
            counter+=1;
        }

        console.log(rowsArray);
        this.setState({rows: rowsArray});
    }

    componentDidMount() {
        console.log('Hello World');
        axios.get('http://127.0.0.1:5000/getSavedData', {
            headers: {
                "Authorization": this.props.token
            }
        })
        .then(res => {
            this.handleTableData(res.data);
        })
        .catch(err => console.warn(err))
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

    selectOperation = (selection) => {
        this.setState({selected: parseInt(selection.rowIds[0])})
        console.log(this.state.selected)
        console.log(this.state.rows)
    }

    handleSelectDataClick = () => {
        this.props.setSelected(this.state.rows[this.state.selected]['dataID']);
        this.props.history.push('/selectedSavedData');
    }

    showButton = () => {
        if(this.state.selected!==null){
            return (
                <div>
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                        style={{color: '#000', backgroundColor: "#36D7B7", borderColor: "#36D7B7", width: '200px', position: 'absolute', top: '665px', left: '555px'}}
                        onClick={() => {this.handleSelectDataClick()}}
                    >
                        Select Data
                    </button>
                    <DeleteIcon style={{position: 'absolute', top: '675px', left: '775px', color: "#D11A2A"}}/>
                </div>
            )
        }
    }
    

    render () {
        if (this.state.getDataClicked===false){
            return (
                <div>
                    <GlobalStyle/>
                    <h1 style={welcomeStyle}>Hello {this.props.username},</h1>
                    <Button variant="btn btn-primary btn-block" style={{backgroundColor: "#26688E", borderColor: "#26688E", width: '350px', position: 'absolute', top: '175px', left: '50px'}} size='lg' onClick={this.goToUpload}>Upload New Data</Button>{' '}
                    <h2 style={getDataStyle}>Work With Previously Saved Data</h2>{' '}

                    <div style={{ height: 300, width: '40%', position: 'absolute', top: '350px', left: '375px' }}>
                        <ThemeProvider theme={darkTheme}>
                        <DataGrid rows={this.state.rows} columns={columns} pageSize={5} disableMultipleSelection={true} onSelectionChange={(newSelection) => {this.selectOperation(newSelection)}} />
                        </ThemeProvider>
                    </div>
                    {this.showButton()}
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