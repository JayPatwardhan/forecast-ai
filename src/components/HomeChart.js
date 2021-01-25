import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';


export default class HomeChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
                datasets: [
                    {
                        label: "Your Data",
                        data: [33, 46, 80, 60, 72, 90],
                        fill: false,
                        borderColor: "rgba(75,192,192,1)"
                    },
                    {
                        label: "Forecast",
                        data: [, , , , , 90 , 110, 120, 105],
                        fill: false,
                        borderColor: "#fff"
                    }
                ]
            }
        };
    }

    render () {
        return (
            <div>
            <Line data={this.state.data} />
            </div>
        );
    }
}