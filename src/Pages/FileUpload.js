import axios from 'axios';
import React from 'react';
import {useForm} from 'react-hook-form';
import './FileUpload.css'


const formStyle = {
    position: 'absolute',
    top: '150px',
    left: '450px'
};

const headerStyle = {
    position: 'absolute',
    top: '100px',
    left: '435px'
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
            <h2 style={headerStyle}>Please upload your csv file here!</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
                <input ref={register} type="file" name="csv" />
                <button>Submit</button>
            </form>
        </div>
    );
}

export default FileUpload;