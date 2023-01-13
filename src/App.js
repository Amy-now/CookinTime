import Pages from "./pages/Pages";
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components";
/*
import firebase from 'firebase/app';
import 'firebase/auth';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD88xkqLum54IaiG3kMPiAPSpiRQSo6sG8",
  authDomain: "cooking-171d8.firebaseapp.com",
  projectId: "cooking-171d8",
  storageBucket: "cooking-171d8.appspot.com",
  messagingSenderId: "630091626049",
  appId: "1:630091626049:web:9150b91499216f5dda78c0",
  measurementId: "G-DP2E1LF46S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/
function App() {
  return (
    <div className="App">
      <Router>
        <Pages />
      </Router>
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Consolas", sans-serif;
  padding-left: 1rem;
  transform: translateX(50%);
`;

const Nav = styled.div`
  padding: 3rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    color: var(--gray-600);
    font-size: 2rem;
  }
`;

export default App;
