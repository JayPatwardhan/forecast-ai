import React, { Component } from 'react';

export default class DataSelected extends Component {
    render() {
        return (
            <div>
                <h1>Hello</h1>
                <h1>{this.props.data_id}</h1>
            </div>
        );
    }
}