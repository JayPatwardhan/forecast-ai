import React, {Component} from 'react' ;
import { CsvToHtmlTable } from 'react-csv-to-table';

export default class DisplayResult extends Component{

    constructor(props){
        super(props);
        this.state = {
            yes: ''
        };

        //this.handleSubmit = this.handleSubmit.bind(this)
    }

    render() {
        return (
            <div>
                <h1>{this.props.test}</h1>
                <h1>{this.props.res_result}</h1>
            </div>
        );
    }

}

//<CsvToHtmlTable 
  //              data = {this.props.res_result}
    //            csvDelimiter=","
      //          tableClassName="table table-striped table-hover"
        //    />