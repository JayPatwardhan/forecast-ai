import axios from 'axios';
import React from 'react';
import {useForm} from 'react-hook-form';
import './FileUpload.css'
import styled, {createGlobalStyle, css} from 'styled-components';

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


const formStyle = {
    position: 'absolute',
    top: '150px',
    left: '450px'
};

const headerStyle = {
    position: 'absolute',
    top: '100px',
    left: '435px',
    color: "#26688E"
}

const FileUpload = (props) => {

    const {register, handleSubmit} = useForm()

    const onSubmit = (data) => {
        //const formData = new FormData()
        props.fData.append("file", data.csv[0]);
        props.history.push('/config');
        // axios.post('http://127.0.0.1:5000/sendCSV', formData, {
        //     headers: {
        //         "Authorization": props.token
        //     }
        // }).then(res => console.log(res)).catch(err => console.warn(err))
    }

    return (
        <div>
            <GlobalStyle/>
            <h2 style={headerStyle}>Please upload your csv file here!</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={formStyle} className='form'>
                <input style={{color: "#26688E"}} ref={register} type="file" name="csv" />
                <button className="btn btn-primary btn-block" style={{margin: '10px', position: 'relative', left: '0px', top: '20px', backgroundColor: "#26688E", borderColor: "#26688E"}}>Submit</button>
            </form>
        </div>
    );
}

export default FileUpload;