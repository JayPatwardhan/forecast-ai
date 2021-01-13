import React, { Component, useState } from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { css } from "@emotion/core";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import download from 'downloadjs';
import Button from 'react-bootstrap/Button';

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
    //font: "100000px"
};

const loadTextStyle2={
    position: 'relative',
    top: "150px",
    left: "275px",
    //font: "100000px"
};

const downloadButtonStyle={
    position: 'relative',
    top: "200px",
    left: "20px",
    //font: "100000px"
};

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
        axios.post('http://127.0.0.1:5000/updateAndPredict', props.fData, {
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input ref={register} type="file" name="csv" />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
    else if (submitted===true && responseGot===false){
        return (
            <div>
                <ClimbingBoxLoader color={'#36D7B7'} loading={true} css={override} size={15} />
                <strong style={loadTextStyle}>Please wait, as we generate your forecast!</strong>
            </div>
        );
    }
    else{
        return (
            <>
                <strong style={loadTextStyle}>Your results are ready!</strong>
                <strong style={loadTextStyle2}>Click to download your .csv file with your results</strong>
                <Button variant="outline-primary" style={downloadButtonStyle} size='lg' onClick={clickDownload}>Download</Button>{' '}
            </>
        );
    }


}

export default DataSelected;