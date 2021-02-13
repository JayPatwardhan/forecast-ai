import React, { Component } from 'react';
import axios from 'axios';
import yaml from 'js-yaml';
import YAML from 'yaml';
import download from 'downloadjs';
import './configCompTrial.css';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { css } from "@emotion/core";
import { CsvToHtmlTable } from 'react-csv-to-table';
//import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import styled, {createGlobalStyle} from 'styled-components';

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

const configFormStyle = {
    position: 'absolute',
    left: '400px',
    top: '100px'
};

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  position: relative;
  top: 100px;
`;

const loadTextStyle={
    position: 'relative',
    top: "100px",
    left: "445px",
    //font: "100000px"
    color: "#36D7B7"
};

const loadTextStyle2={
    position: 'relative',
    top: "150px",
    left: "45px",
    //font: "100000px"
    color: "#36D7B7"
};

const downloadButtonStyle={
    position: 'relative',
    top: "200px",
    left: "-295px",
    //font: "100000px"
};

const initialState = {
    input_name: 'input.csv',
    output_name: 'result',
    time_format_type: 'index',
    horizon: +3,
    backtest: '',
    eval_metric: 'wape',
    display_metric: '',
    use_gpu: 'no',
    threads: 0,
    algorithm: '',
};


export default class ConfigCompTrial extends Component {

    constructor(props){
        super(props);
        this.state = {
            input_name: 'input.csv',
            output_name: 'result',
            time_format_type: 'index',
            horizon: +3,
            backtest: '',
            eval_metric: 'wape',
            display_metric: '',
            use_gpu: 'no',
            threads: 0,
            algorithm: '',

            //not relating to form
            submitted:'',

            response:false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateOnRes = (res) => {
        let csvData = res.data
        console.log(csvData.split(','))
        //const newCSV = d3.csv(csvData, function(csvData) { console.log(csvData); });
        //let newCSV = csvToJson.getJsonFromCsv(csvData)
        //console.log(newCSV)
        //this.props.res_result=csvData;
        //console.log(this.props.res_result)
        this.setState({response: csvData})
        this.props.fData.delete('file')
        this.props.fData.delete('file2')
        this.setState(initialState)
        //download(this.state.response, 'result.csv', 'csv')
        //console.log(this.state.respose)
       //this.props.history.push('/displayResult');
    }

    async handleSubmit(event) {
        event.preventDefault()
        //parse the YAML file
        const object = {
            input_name: this.state.input_name,
            output_name: this.state.output_name,
            time_format_type: this.state.time_format_type,
            forecast: {
                horizon: parseInt(this.state.horizon)
            },
            backtest: {
                evaluation_metric: this.state.eval_metric
            },
            hardware: {
                use_gpu: this.state.use_gpu,
                threads: this.state.threads
            }
        }

        if (this.state.algorithm!=='') object['algorithms'] = this.state.algorithm
        if (this.state.backtest !== '') object['backtest']['backtest_start_time'] = parseInt(this.state.backtest)
        if (this.state.display_metric !== '') object['backtest']['display_metric'] = this.state.display_metric
        if (this.state.threads !== '') object['hardware']['threads'] = parseInt(this.state.threads)

        //const yamlObject = yaml.dump(object, {'sortKeys': false});
        const yamlObject = new YAML.Document()
        yamlObject.contents = object
        console.log(yamlObject);

        this.props.fData.append("file2", yamlObject);
        console.log(this.props.fData)

        this.setState({submitted: true});

        console.log(this.state.submitted)

        //make request
        axios.post(this.props.url + '/sendCSV', this.props.fData, {
            headers: {
                "Authorization": "trial"
            }
        })
        //.then(res => download(res.data, 'result.csv', 'csv'))
        .then(res => {
            //this.props.res_result=res;
            //this.props.history.push('/displayResult');
            this.updateOnRes(res);
            //this.props.res_result=res.data
        })
        .catch(err => console.warn(err))

    }

    clickDownload = () => {
        download(this.state.response, 'result.csv', 'csv')
    }

    myChangeHandlerAlgorithm = (event) => {
        this.setState({algorithm: event.target.value});
    }

    myChangeHandlerInputName = (event) => {
        this.setState({input_name: event.target.value});
    }

    myChangeHandlerOutputName = (event) => {
        this.setState({output_name: event.target.value});
    }

    myChangeHandlerTimeFormat = (event) => {
        this.setState({time_format_type: event.target.value});
    }

    myChangeHandlerHorizon = (event) => {
        this.setState({horizon: event.target.value});
    }

    myChangeHandlerBacktest = (event) => {
        this.setState({backtest: event.target.value});
    }

    myChangeHandlerEvaluation = (event) => {
        this.setState({eval_metric: event.target.value});
    }

    myChangeHandlerDisplay = (event) => {
        this.setState({display_metric: event.target.value});
    }

    myChangeHandlerGPU = (event) => {
        this.setState({use_gpu: event.target.value});
    }

    myChangeHandlerThreads = (event) => {
        this.setState({threads: event.target.value});
    }

    render() {
        if (this.state.submitted!==true && this.state.response===false){
            return (
                <div>
                <GlobalStyle/>
                <form style={configFormStyle} onSubmit={this.handleSubmit} className="form">
                    <h3 style={{color: "#26688E"}}>Configs (all are optional)</h3>


                    <div className="form-group">
                        <label style={{color: "#36D7B7"}}> Select Algorithm (automl, nbeats, arima, regression)</label>
                        <input style={{backgroundColor: "#1B1B1B", borderColor:"#1B1B1B", color: '#fff'}} type="text" className="form-control" onChange = {this.myChangeHandlerAlgorithm} placeholder="default: automl" />
                    </div>

                    <div className="form-group">
                        <label style={{color: "#36D7B7"}}>Input Name</label>
                        <input style={{backgroundColor: "#1B1B1B", borderColor:"#1B1B1B", color: '#fff'}} type="text" className="form-control" onChange = {this.myChangeHandlerInputName} placeholder="default: input.csv" />
                    </div>

                    <div className="form-group">
                        <label style={{color: "#36D7B7"}}>Output Name</label>
                        <input style={{backgroundColor: "#1B1B1B", borderColor:"#1B1B1B", color: '#fff'}} type="text" className="form-control" onChange = {this.myChangeHandlerOutputName} placeholder="output name..." />
                    </div>

                    <div className="form-group">
                        <label style={{color: "#36D7B7"}}>Time Format Type (standard or index)</label>
                        <input style={{backgroundColor: "#1B1B1B", borderColor:"#1B1B1B", color: '#fff'}} type="text" className="form-control" onChange = {this.myChangeHandlerTimeFormat} placeholder="default: index" />
                    </div>

                    <div className="form-group">
                        <label style={{color: "#36D7B7"}}>Forecast Horizon (+ horizon desired)</label>
                        <input style={{backgroundColor: "#1B1B1B", borderColor:"#1B1B1B", color: '#fff'}} type="text" className="form-control" onChange = {this.myChangeHandlerHorizon} placeholder="default: +3" />
                    </div>

                    <div className="form-group">
                        <label style={{color: "#36D7B7"}}>Backtest Start Time (- desired backtest start)</label>
                        <input style={{backgroundColor: "#1B1B1B", borderColor:"#1B1B1B", color: '#fff'}} type="text" className="form-control" onChange = {this.myChangeHandlerBacktest} placeholder="default: last 10% of data" />
                    </div>

                    <div className="form-group">
                        <label style={{color: "#36D7B7"}}>Evaluation Metric (wape,mape,mae,mae%,rmse)</label>
                        <input style={{backgroundColor: "#1B1B1B", borderColor:"#1B1B1B", color: '#fff'}} type="text" className="form-control" onChange = {this.myChangeHandlerEvaluation} placeholder="default: wape" />
                    </div>

                    <div className="form-group">
                        <label style={{color: "#36D7B7"}}>Display Metric (wape,mape,mae,mae%,rmse)</label>
                        <input style={{backgroundColor: "#1B1B1B", borderColor:"#1B1B1B", color: '#fff'}} type="text" className="form-control" onChange = {this.myChangeHandlerDisplay} placeholder="default: none" />
                    </div>

                    <button style={{backgroundColor: "#26688E", borderColor: "#26688E"}} type="submit" className="btn btn-primary btn-block">Submit</button>

                </form>
                </div>
            );
        }
        else if (this.state.response===false && this.state.submitted===true){
            return (
                //<Spinner animation="border" />
                <div>
                    <GlobalStyle/>
                    <ClimbingBoxLoader color={'#36D7B7'} loading={true} css={override} size={15} />
                    <strong style={loadTextStyle}>Please wait, as we generate your forecast!</strong>
                </div>
            );
        }
        else if (this.state.response!==false){
            return (
                <>
                    <GlobalStyle/>
                    <strong style={loadTextStyle}>Your results are ready!</strong>
                    <strong style={loadTextStyle2}>Click to download your .csv file with your results</strong>
                    <Button variant="outline-primary" style={downloadButtonStyle} size='lg' onClick={this.clickDownload}>Download</Button>{' '}
                </>
            );
        }
    }

};
