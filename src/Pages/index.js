import React from 'react'
import styled, {createGlobalStyle, css} from 'styled-components';
import HomeChart from '../components/HomeChart';
import { Fade} from "react-awesome-reveal";

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

const chartStyle = {
    width: '500px',
    position: 'absolute',
    //top: '120px',
    //left: '25px'
    top: '200px',
    left: '400px'
};

const headerStyle = {
    position: 'absolute',
    left: '230px',
    top: '95px',
    color: '#36D7B7'
};

//<div style={{width: "100%", height: "0", paddingNottom: "100%", position: "relative"}}><iframe src="https://giphy.com/embed/8gNQZ9IpkcdiAjfOgN" width="100%" height="100%" style={{position:"absolute"}} frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/illustration-marketing-data-8gNQZ9IpkcdiAjfOgN">via GIPHY</a></p>

const Home = (props) => {
    return (
        <div>
            <GlobalStyle/>
            <Fade style={headerStyle}>
                <h1>Forecasts at the click of a button</h1>
            </Fade>
            <div style={chartStyle}>
                <HomeChart/>
            </div>
        </div>
    )
}

export default Home
