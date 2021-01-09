import React, { Component } from 'react';
import axios from 'axios';
import yaml from 'js-yaml';
import YAML from 'yaml';
import download from 'downloadjs';
import './configComp.css';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { css } from "@emotion/core";
import { CsvToHtmlTable } from 'react-csv-to-table';

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
    left: "550px",
    font: "100000px"
};

export default class configcomp extends Component {

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
            submitted: '',

            response:false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateOnRes = (res) => {
        let csvData = res.data
        //const newCSV = d3.csv(csvData, function(csvData) { console.log(csvData); });
        //let newCSV = csvToJson.getJsonFromCsv(csvData)
        //console.log(newCSV)
        //this.props.res_result=csvData;
        //console.log(this.props.res_result)
        this.setState({response: csvData})
        console.log(this.state.response)
        download(this.state.response, 'result.csv', 'csv')
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
        axios.post('http://127.0.0.1:5000/sendCSV', this.props.fData, {
            headers: {
                "Authorization": this.props.token
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
                <form onSubmit={this.handleSubmit} className="form">
                    <h3>Configs</h3>

                    <div className="form-group">
                        <label> Select Algorithm</label>
                        <input type="text" className="form-control" onChange = {this.myChangeHandlerAlgorithm} placeholder="algorithm name..." />
                    </div>

                    <div className="form-group">
                        <label>Input Name</label>
                        <input type="text" className="form-control" onChange = {this.myChangeHandlerInputName} placeholder="input name..." />
                    </div>

                    <div className="form-group">
                        <label>Output Name</label>
                        <input type="text" className="form-control" onChange = {this.myChangeHandlerOutputName} placeholder="output Name..." />
                    </div>

                    <div className="form-group">
                        <label>Time Format Type</label>
                        <input type="text" className="form-control" onChange = {this.myChangeHandlerTimeFormat} placeholder="standard or index" />
                    </div>

                    <div className="form-group">
                        <label>Forecast Horizon</label>
                        <input type="text" className="form-control" onChange = {this.myChangeHandlerHorizon} placeholder="+horizon" />
                    </div>

                    <div className="form-group">
                        <label>Backtest Start Time (Optional)</label>
                        <input type="text" className="form-control" onChange = {this.myChangeHandlerBacktest} placeholder="-length" />
                    </div>

                    <div className="form-group">
                        <label>Evaluation Metric</label>
                        <input type="text" className="form-control" onChange = {this.myChangeHandlerEvaluation} placeholder="Metric for algorithm to optimize on" />
                    </div>

                    <div className="form-group">
                        <label>Display Metric (Optional)</label>
                        <input type="text" className="form-control" onChange = {this.myChangeHandlerDisplay} placeholder="Other metrics to show" />
                    </div>

                    <div className="form-group">
                        <label>Use GPU?</label>
                        <input type="text" className="form-control" onChange = {this.myChangeHandlerGPU} placeholder="yes/no" />
                    </div>

                    <div className="form-group">
                        <label>Threads to Use (optional)</label>
                        <input type="text" className="form-control" onChange = {this.myChangeHandlerThreads} placeholder="# threads (optional)" />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>

                </form>
            );
        }
        else if (this.state.response===false && this.state.submitted===true){
            return (
                //<Spinner animation="border" />
                <div>
                    <ClimbingBoxLoader color={'#36D7B7'} loading={true} css={override} size={15} />
                    <strong style={loadTextStyle}>Please wait, as we generate your forecast!</strong>
                </div>
            );
        }
        else if (this.state.response!==''){
            return (
                <CsvToHtmlTable 
                    data = {this.state.response}
                    csvDelimiter=","
                />
            );
        }
    }

};
