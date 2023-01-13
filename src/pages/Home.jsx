import Popular from '../components/Popular';
import { motion } from 'framer-motion';
import styled from "styled-components";
import Category from "../components/Category";
import Search from "../components/Search";
import Menu from "../components/Menu";
import React, { useEffect } from 'react';
import { auth } from "../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Home() {

    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
      if (loading) {
          // maybe trigger a loading screen
          return;
      }
      if (!user) window.location.href = '/login';
      ;
  }, [user, loading]);

	return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Nav>
        <div className="flex justify-center container" id="background">
          <div className="flex justify-center" id="header">
            <h1 id="title" className="text-5xl font-bold mt-0 mb-6">
              Search Recipies
            </h1>
          </div>
        </div>
        <h1 id="title" className="text-5xl font-bold mt-0 mb-6"></h1>
      </Nav>
      {/* <div>
        <h1 id="user">
          Hello {user.displayName ? user.displayName : user.email},
        </h1>
        <p>What you're going to cook today?</p>
      </div> */}
      <Search />
      <Category />
      <Popular />
      <Menu />
    </motion.div>
  );
}

const Nav = styled.div`
  h1 {
    font-family: "Rockwell";
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 38px;
    text-align: center;
    color: #222222;
    margin-top: 50px;

  }
  p {
    color: #222222;
  }

  h5 {
    background: rgba(255, 254, 249, 0.75);
    border-radius: 11px;
    font-family: "Rockwell";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    width: fit-content;
    padding: 0 10px;
  }
  #background {
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    left: 20px;
    border-radius: 45px 45px 0 0;
    background: #ffe58a;
    margin-top: 20px;
  }
  #header {
    padding: 20px;
  }
`;


export default Home;
