import React, { Component, useState } from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { css } from "@emotion/core";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import download from 'downloadjs';
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
    left: "525px",
    //font: "100000px"
    color: "#36D7B7"
};

const loadTextStyle2={
    position: 'relative',
    top: "150px",
    left: "95px",
    //font: "100000px"
    color: "#36D7B7"
};

const downloadButtonStyle={
    position: 'relative',
    top: "200px",
    left: "-245px",
    //font: "100000px"
};

const formStyle = {
    position: 'absolute',
    top: '250px',
    left: '450px'
};

const headerStyle = {
    position: 'absolute',
    top: '100px',
    left: '40px',
    color: "#36D7B7"
}

const DataSelected = (props) => {

    const {register, handleSubmit} = useForm()

    const [submitted,updateSubmitted]=useState(false);
    const [responseGot, updateGot]=useState(false)

    const afterResponse = (res) => {
        updateGot(res.data);
        props.fData.delete("file");
    }

    const onSubmit = (data) => {
        //const formData = new FormData()
        updateSubmitted(!submitted);
        props.fData.append("file", data.csv[0]);
        axios.post('https://forecast-6j2gkews6a-uw.a.run.app/updateAndPredict', props.fData, {
            headers: {
                "Authorization": props.token,
                "data_id": props.data_id
            }
        })
        .then(res => {
            afterResponse(res)
        })
        .catch(err => console.warn(err))
    }

    const clickDownload = () => {
        download(responseGot, 'result.csv', 'csv')
    }

    if (submitted===false){
        return (
            <div>
                <GlobalStyle />
                <h2 style={headerStyle}>Please upload the new data you would like to append to this dataset to get newer forecasts</h2>
                <form onSubmit={handleSubmit(onSubmit)} style={formStyle} className="form">
                    <input style={{color: "#26688E"}} ref={register} type="file" name="csv" />
                    <button className="btn btn-primary btn-block" style={{margin: '10px', position: 'relative', left: '0px', top: '20px', backgroundColor: "#26688E", borderColor: "#26688E"}}>Submit</button>
                </form>
            </div>
        );
    }
    else if (submitted===true && responseGot===false){
        return (
            <div>
                <GlobalStyle />
                <ClimbingBoxLoader color={'#36D7B7'} loading={true} css={override} size={15} />
                <strong style={loadTextStyle}>Please wait, as we generate your forecast!</strong>
            </div>
        );
    }
    else{
        return (
            <>
                <GlobalStyle />
                <strong style={loadTextStyle}>Your results are ready!</strong>
                <strong style={loadTextStyle2}>Click to download your .csv file with your results</strong>
                <Button variant="outline-primary" style={downloadButtonStyle} size='lg' onClick={clickDownload}>Download</Button>{' '}
            </>
        );
    }


}

export default DataSelected;