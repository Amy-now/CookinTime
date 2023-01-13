import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth, sendPasswordReset } from "../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ForgotPage = () => {
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);

    const forgot = () => {
        if (!email) alert("Please enter email");
        sendPasswordReset(email);
    };

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) window.location.href = '/';
        ;
    }, [user, loading]);

    return (
        <Forgot>
            <div className="flex justify-center container" id='background'>
                <div className="flex justify-center" id='header'>
                    <h1>Login</h1>
                </div>
                <div className="flex justify-center container">
                    <div className="flex justify-center container">
                        <input
                            type="email"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="exampleEmail0"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <Link to={`/login`}>
                            <button onClick={forgot} id='reset' className="hover focus:outline-none">Reset
                            </button>
                        </Link>

                        <Link to={`/login`}>
                            <button id='login' className="hover focus:outline-none">Login
                            </button>
                        </Link>
                    </div>
                    <p>or</p>
                    <Link to={`/regester`}>
                        <button id='regester' className="bg-transparent hover focus:outline-none">Register
                        </button>
                    </Link>
                </div>
            </div>
        </Forgot>
    );
};

const Forgot = styled.div`
* {
    color: black;
}

h1 {
    font-family: 'Rockwell';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 47px;
    color: #222222;
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
    margin: 30px;
    background: #EAE9E9;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
    width: 304px;
    height: 45px;
}

#login {
    background: #FFE58A;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    border-radius: 35px;
    padding: 10px;
    width: 120px;
    margin-top: 60px;
    font-family: 'Rockwell';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #222222;
}

#reset {
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
}

#regester {
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
    margin: 20px;
    cursor: context-menu;
    text-decoration-line: none;
    color: #A5A5A5;
}

#header {
    margin-right: auto;
    padding: 20px;
}

#change {
    margin-right: 6%;
}
`;

export default ForgotPage;