import React, { Component } from 'react';
import axios from 'axios';
import yaml from 'js-yaml';

export default class configcomp extends Component {

    constructor(props){
        super(props);
        this.state = {
            input_name: '',
            output_name: '',
            time_format_type: '',
            horizon: '',
            backtest: '',
            eval_metric: '',
            display_metric: '',
            use_gpu: '',
            threads: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        //parse the YAML file

        //make request
        axios.post('http://127.0.0.1:5000/sendCSV', props.fData, {
            headers: {
                "Authorization": props.token
            }
        }).then(res => console.log(res)).catch(err => console.warn(err))

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
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Configs</h3>

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

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>

            </form>
        );
    }

};
