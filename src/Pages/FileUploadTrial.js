import axios from 'axios';
import React from 'react';
import {useForm} from 'react-hook-form';
import './FileUploadTrial.css'
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


const sharedStyle = css`
    background-color: #eee;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ddd;
    margin: 10px 0 20px 0;
    padding: 20px;
    box-sizing: border-box;
`;

const StyledFormrapper = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 850px;
    padding: 0 20px;

`;

const StyledForm = styled.form`
    width: 100%;
    max-width: 700px;
    padding: 50px;
    background-color: #fff;
    border-radius: 10px;
    box-size: border-box;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
`;

const StyledButton = styled.button`
    display: block;
    background-color: #f7797d;
    color: #fff;
    font-size: .9rem;
    border: 0;
    border-radius: 5px;
    height: 40px;
    padding: 0 20px;
    cursor: pointer;
    box-sizing: border-box;
    margin: 10px;
    position: relative;
    left: -10px;
`

const StyledInput = styled.input`

`

const StyledTextArea = styled.textarea`

`

const StyledFieldset = styled.fieldset`

`

const StyledError = styled.div`

`


const formStyle = {
    position: 'absolute',
    top: '150px',
    left: '450px',
};

const headerStyle = {
    position: 'absolute',
    top: '100px',
    left: '450px',
    color: "#26688E"
}

const textStyle = {
    padding: '25px',
    left: '100px'
};


const FileUploadTrial = (props) => {

    const {register, handleSubmit} = useForm()

    const onSubmit = (data) => {
        //const formData = new FormData()
        props.fData.append("file", data.csv[0]);
        props.history.push('/trialForm');
        // axios.post('http://127.0.0.1:5000/sendCSV', formData, {
        //     headers: {
        //         "Authorization": props.token
        //     }
        // }).then(res => console.log(res)).catch(err => console.warn(err))
    }

    return (
        // style={formStyle}
        <div>
                <GlobalStyle/>
                <h1 style = {headerStyle}>Data upload</h1>
                <form style = {formStyle} onSubmit={handleSubmit(onSubmit)} className="form">
                    <input style={{color: "#26688E"}}f ref={register} type="file" name="csv" />
                    <button className="btn btn-primary btn-block" style={{margin: '10px', position: 'relative', left: '0px', top: '20px', backgroundColor: "#26688E", borderColor: "#26688E"}}>Upload</button>
                </form>
        </div>
    );
}

export default FileUploadTrial;

// <h2 style={headerStyle}>Please upload your csv file here!</h2>