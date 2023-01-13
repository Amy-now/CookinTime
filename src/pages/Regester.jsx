import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
} from "../components/firebase";
const RegesterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);

    const register = () => {
        if (!name) alert("Please enter name");
        registerWithEmailAndPassword(name, email, password);
    };

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        //if (user) window.location.href = '/';
        ;
    }, [user, loading]);


    return (
        <Regester>
            <div className="flex justify-center container" id='background'>
                <div className="flex justify-center" id='header'>
                    <h1>Regester</h1>
                </div>
                <div className="flex justify-center container">

                    <input
                        style={{ marginTop: '100px' }}
                        type="text"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleText0"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Username"
                    />
                    <input
                        type="password"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="examplePassword0"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <input
                        type="email"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleEmail0"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />

                    <button onClick={signInWithGoogle} type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out" style={{ backgroundColor: "#ea4335", padding: "10px 30px", margin: "30px" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="w-4 h-4">
                            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                        </svg>
                    </button>
                    <button onClick={register} id='regester' className="hover focus:outline-none">Register
                    </button>
                    <p>or</p>
                    <Link to={`/login`}>
                        <button id='login' className="bg-transparent hover focus:outline-none">Login
                        </button>
                    </Link>
                </div>
            </div>
        </Regester>
    );
};

const Regester = styled.div`
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
    margin-top: 30px;
    font-family: 'Rockwell';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #222222;
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

export default RegesterPage;