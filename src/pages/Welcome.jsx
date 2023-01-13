import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";

const WelcomePage = () => {

    return (
        <Welcome>
            <div className="flex justify-center container" id='background'>
                <div className="flex justify-center" id='header'>
                    <img
                        src="../../chef.png"
                        className="rounded-lg"
                    />
                </div>
                <div className="flex justify-center container">

                    <h1>It's Cookin Time!</h1>
                    <Link to={`/regester`}>
                        <button id='regester' className="hover focus:outline-none">Regester
                        </button>
                    </Link>
                    <p>or</p>
                    <Link to={`/login`}>
                        <button id='login' className="bg-transparent hover focus:outline-none">Login
                        </button>
                    </Link>
                </div>
            </div>
        </Welcome>
    );
};

const Welcome = styled.form`
* {
    color: black;
}

img{
    height: 100% !important;
    width: 100% !important;
}

h1 {
    font-family: 'Rockwell';
    font-style: normal;
    font-weight: 400;
    font-size: 48px;
    line-height: 56px;
    color: #222222;
    width: min-content;
    text-align: left;
}

.container {
    background: #FFFEF9;
    margin: auto;
    border-radius: 45px 45px 0 0;
    display: flex;
    width: inherit;
    flex-direction: column;
    align-items: center;
}

#app {
    display: flex;
    align-items: center;
    justify-content: center;
}
#background {
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    left: 20px;
    background: #FFE58A;
    border-radius: 45px; 
    margin-top: 20px;
}

input {
    margin: 10px;
    background: #EAE9E9;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
    width: 304px;
    height: 45px;
}

#regester {
    background: #FFE58A;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    border-radius: 35px;
    padding: 10px;
    width: 120px;
    font-family: 'Rockwell';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #222222;
    margin-top: 40px;
}

#login {
    font-family: 'Rockwell';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 23px;
text-align: center;

color: #959595;
}

img {
    width: 69px;
    height: 69px;
}

p {
    line-height: 18px;
    font-family: 'Rockwell';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    margin: 10px;
    cursor: context-menu;
    text-decoration-line: none;
    color: #A5A5A5;
}

#header {
    padding: 20px;
}

#change {
    margin-right: 6%;
}
`;

export default WelcomePage;